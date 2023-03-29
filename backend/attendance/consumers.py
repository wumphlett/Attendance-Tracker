import json

from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer


class CoordinationConsumer(WebsocketConsumer):
    def connect(self):
        # TODO AUTH CHECK & ACTIVE SESSION CHECK
        self.room_name = self.scope["url_route"]["kwargs"]["join_code"]
        self.room_group_name = f"session_{self.room_name}"

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name, self.channel_name
        )

        self.accept()

    def disconnect(self, code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name, self.channel_name
        )

    def receive(self, text_data=None, bytes_data=None):
        text_data = json.loads(text_data)

        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name, {"type": "session_update", "update": text_data}
        )

    def session_update(self, event):
        update = event["update"]

        self.send(text_data=json.dumps(update))
