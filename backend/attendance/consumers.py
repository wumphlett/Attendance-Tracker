import json

from channels.generic.websocket import WebsocketConsumer


class CoordinationConsumer(WebsocketConsumer):
    def connect(self):
        # TODO AUTH CHECK & ACTIVE SESSION CHECK
        self.accept()

    def disconnect(self, code):
        pass

    def receive(self, text_data=None, bytes_data=None):
        text_data = json.loads(text_data)
