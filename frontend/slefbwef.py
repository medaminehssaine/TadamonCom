import flask

app = flask.Flask(__name__)

@app.route("/api/auth/register")
def register():
    return flask.jsonify({"ok": True})

@app.route("/api/auth/login")
def logggg():
    return flask.jsonify({"ok": True})

app.run()