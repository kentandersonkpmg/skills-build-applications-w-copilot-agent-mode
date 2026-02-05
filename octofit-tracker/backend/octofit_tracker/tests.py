from django.test import TestCase
from .models import User, Team, Activity, Workout, Leaderboard

class ModelTests(TestCase):
    def setUp(self):
        self.team = Team.objects.create(name='Test Team')
        self.user = User.objects.create(name='Test User', email='test@example.com', team=self.team)
        self.activity = Activity.objects.create(user=self.user, activity='Running', duration=30)
        self.workout = Workout.objects.create(name='Test Workout', suggested_for='Test Team')
        self.leaderboard = Leaderboard.objects.create(team=self.team, points=100)

    def test_user(self):
        self.assertEqual(self.user.name, 'Test User')
        self.assertEqual(self.user.team.name, 'Test Team')

    def test_activity(self):
        self.assertEqual(self.activity.activity, 'Running')
        self.assertEqual(self.activity.duration, 30)

    def test_workout(self):
        self.assertEqual(self.workout.name, 'Test Workout')

    def test_leaderboard(self):
        self.assertEqual(self.leaderboard.points, 100)
