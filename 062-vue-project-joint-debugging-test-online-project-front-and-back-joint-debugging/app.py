from flask import Flask, Blueprint, jsonify
import json
import os

app = Flask(__name__)
api = Blueprint('api', __name__)
app.register_blueprint(api, url_prefix='/api')


def getIndexJson(filename):
    path = os.path.join(os.getcwd(), 'backend-data',filename)
    f = open(path)
    data = json.load(f)
    return data


@app.route('/', methods=['get'])
def index():
    return "hello flask"


@app.route('/api')
def api_root():
    res = {'status': "ok"}
    return jsonify(res)


@app.route('/api/index.json')
def api_index():
    res = getIndexJson('index.json')
    return jsonify(res)


@app.route('/api/detail.json')
def api_detail():
    res = getIndexJson('detail.json')
    return jsonify(res)


@app.route('/api/city.json')
def api_city():
    res = getIndexJson('city.json')
    return jsonify(res)


if __name__ == "__main__":
    # 打印注册的flask路由信息
    print(app.url_map)
    app.run(debug=True)
