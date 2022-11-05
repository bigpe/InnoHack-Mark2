import os
from typing import Callable


def load_option_from_env(option: str, default: any, transform: Callable = None, default_is_empty=False):
    value = os.environ.get(option, default)
    if transform:
        value = transform(value)
    if default_is_empty and not value:
        value = default
    return value


def numeric_to_bool(numeric_string):
    return bool(int(numeric_string))


def split_by_coma(coma_string):
    return coma_string.split(',')
