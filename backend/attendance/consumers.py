import json

from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer


class CoordinationConsumer(WebsocketConsumer):
    @property
    def group_name(self):
        return f"{'presenter' if self.is_presenter else 'responder'}_{self.base_name}"

    @property
    def opposing_group_name(self):
        return f"{'presenter' if not self.is_presenter else 'responder'}_{self.base_name}"

    def connect(self):
        self.is_presenter = self.scope["query_string"].decode("utf-8") == "presenter"
        self.base_name = self.scope["url_route"]["kwargs"]["join_code"]

        async_to_sync(self.channel_layer.group_add)(
            self.group_name, self.channel_name
        )

        self.accept()

    def disconnect(self, code):
        async_to_sync(self.channel_layer.group_discard)(
            self.group_name, self.channel_name
        )

    def receive(self, text_data=None, bytes_data=None):
        text_data = json.loads(text_data)

        async_to_sync(self.channel_layer.group_send)(
            self.opposing_group_name, {"type": "session_update", "update": text_data}
        )

    def session_update(self, event):
        update = event["update"]

        self.send(text_data=json.dumps(update))
