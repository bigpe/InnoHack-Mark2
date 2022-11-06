import json
import yaml
import traceback

from flask import jsonify, request

from pathlib import Path
import sys
import importlib

BASE_DIR = Path(__file__).resolve().parent


# Декоратор для получения всех данных переданных с запросом в одном словаре
def get_request_arguments(fn):
    def find_params():
        request_args = find_arguments_from_request(request)
        return fn(request_args)

    return find_params


def find_arguments_from_request(r: request):
    request_args = {}
    try:
        if r.args:
            request_args.update(r.args)
        if r.form:
            request_args.update(r.form)
        if r.is_json:
            request_args.update(r.json)
    except:
        pass
    request_args = convert_dirty_json(request_args)
    return request_args


def convert_dirty_json(request_args: dict) -> dict:
    for arg in request_args:
        if request_args[arg] == 'True' or request_args[arg] == 'true':
            request_args[arg] = True
        if request_args[arg] == 'False' or request_args[arg] == 'false':
            request_args[arg] = False
        try:
            request_args[arg] = json.loads(request_args[arg])
        except Exception:
            pass
    return request_args


def create_response(data):
    return jsonify(data)


def create_flask_endpoint(endpoint_name, endpoint_function_name, api_module):
    @get_request_arguments
    def method_template(kwargs):
        print(kwargs, file=sys.stderr)
        endpoint_function = getattr(api_module, endpoint_function_name) \
            if api_module else globals()[endpoint_function_name]
        endpoint_optional_args = len(endpoint_function.__defaults__) if endpoint_function.__defaults__ else 0
        endpoint_required_args_count = endpoint_function.__code__.co_argcount - endpoint_optional_args
        endpoint_required_args = sorted(endpoint_function.__code__.co_varnames[:endpoint_required_args_count])
        request_args = sorted(kwargs)

        if endpoint_required_args == request_args or request_args > endpoint_required_args:
            try:
                return create_response(endpoint_function(**kwargs))
            except Exception as err:
                return create_response({
                    "message":  "Something wont wrong",
                    "error":    str(err),
                    "traceback": traceback.format_exc()
                })
        else:
            return create_response({
                "message": "Required args not found",
                "args": ", ".join(list(set(endpoint_required_args) - set(request_args)))
            })

    method_template.__name__ = f'method_{endpoint_name}'
    return method_template


def load_endpoints(app):
    api_config = yaml.load(
        open(BASE_DIR.joinpath('api_config.yml'), 'r'), yaml.BaseLoader
    )

    api_endpoints = api_config.get('endpoints', [])
    api_module_name = api_config.get('module', None)
    api_module = None

    if api_module_name:
        try:
            api_module = importlib.import_module(api_module_name)
        except (ModuleNotFoundError, ImportError) as err:
            print(f"Problem with import module #{api_module_name}\n"
                  f"{err}", file=sys.stderr)

    not_existed_funcs = []

    for endpoint in api_endpoints:
        endpoint_name = endpoint.get("name")
        endpoint_function_name = endpoint.get('function')
        endpoint_route = endpoint.get('route')
        endpoint_method = endpoint.get('method', 'POST')

        if endpoint_function_name:
            try:
                endpoint_function = getattr(api_module, endpoint_function_name) \
                    if api_module else globals()[endpoint_function_name]
                if not endpoint_function:
                    not_existed_funcs.append(endpoint_function_name)
            except (AttributeError, KeyError):
                not_existed_funcs.append(endpoint_function_name)

        if endpoint_function_name not in not_existed_funcs:
            flask_endpoint_function = create_flask_endpoint(endpoint_name, endpoint_function_name, api_module)
            print(f"+ Method #{endpoint_function_name} generated", file=sys.stderr)
            app.route(endpoint_route, methods=[endpoint_method])(flask_endpoint_function)

    if not_existed_funcs:
        funcs_str = '\n'.join(not_existed_funcs)
        print(f"Function not exist in scope:\n"
              f"{funcs_str}", file=sys.stderr)