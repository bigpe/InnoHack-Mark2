from typing import Union

from django.contrib.auth import get_user_model
from django.db.models import Manager

from snapshot.models import SnapshotCollection

User = get_user_model()


class BaseUser(User):
    user_snapshot_collections: Union[SnapshotCollection, Manager]
