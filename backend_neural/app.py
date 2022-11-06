import os

from flask import Flask
from global_utils import load_endpoints


class NeuralBackendApp(Flask):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.url_map.strict_slashes = False


app = NeuralBackendApp(__name__)
load_endpoints(app)

app.run(
    host='0.0.0.0',
    port=os.environ.get('BACKEND_NEURAL_PORT', 5000),
    debug=bool(int(os.environ.get('DEBUG', True)))
)
