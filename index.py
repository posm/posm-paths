import tornado.ioloop
import tornado.web
import json
from os import environ
# config
with open('config.json', 'w') as f: 
    config = json.load(f)

devPort = config[environ['ENV'] if 'ENV' in environ.keys() else 'development']

if __name__ == "__main__":
    app = tornado.web.Application([
        url(r'/sequence', sequenceHandler)
    ])
    app.listen(devPort)
    app.ioloop.IOLoop.current().start()