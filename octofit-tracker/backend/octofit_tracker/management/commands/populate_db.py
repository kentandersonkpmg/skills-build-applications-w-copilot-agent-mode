from django.core.management.base import BaseCommand
from django.conf import settings


from pymongo import MongoClient

from django.contrib.auth import get_user_model
from django.apps import apps

import random

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Populating octofit_db with test data...'))


        # Use pymongo for direct collection access
        client = MongoClient('localhost', 27017)
        db = client[settings.DATABASES['default']['NAME']]

        # Drop collections if they exist
        for col in ['users', 'teams', 'activities', 'leaderboard', 'workouts']:
            db[col].drop()

        # Teams
        teams = [
            {'name': 'Team Marvel'},
            {'name': 'Team DC'}
        ]
        team_ids = db.teams.insert_many(teams).inserted_ids

        # Users (superheroes)
        users = [
            {'name': 'Spider-Man', 'email': 'spiderman@marvel.com', 'team_id': team_ids[0]},
            {'name': 'Iron Man', 'email': 'ironman@marvel.com', 'team_id': team_ids[0]},
            {'name': 'Wonder Woman', 'email': 'wonderwoman@dc.com', 'team_id': team_ids[1]},
            {'name': 'Batman', 'email': 'batman@dc.com', 'team_id': team_ids[1]},
        ]
        db.users.insert_many(users)
        db.users.create_index('email', unique=True)

        # Activities
        activities = [
            {'user_email': 'spiderman@marvel.com', 'activity': 'Running', 'duration': 30},
            {'user_email': 'ironman@marvel.com', 'activity': 'Cycling', 'duration': 45},
            {'user_email': 'wonderwoman@dc.com', 'activity': 'Swimming', 'duration': 60},
            {'user_email': 'batman@dc.com', 'activity': 'Yoga', 'duration': 40},
        ]
        db.activities.insert_many(activities)

        # Workouts
        workouts = [
            {'name': 'Cardio Blast', 'suggested_for': 'Team Marvel'},
            {'name': 'Strength Builder', 'suggested_for': 'Team DC'},
        ]
        db.workouts.insert_many(workouts)

        # Leaderboard
        leaderboard = [
            {'team': 'Team Marvel', 'points': 150},
            {'team': 'Team DC', 'points': 120},
        ]
        db.leaderboard.insert_many(leaderboard)

        self.stdout.write(self.style.SUCCESS('octofit_db test data population complete.'))
