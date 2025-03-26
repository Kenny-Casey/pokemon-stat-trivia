import unittest
from src.db.db_builder import *
import random
from tests.test_utils import *

class TestPokemonDB(unittest.TestCase):
    def test_random_pokemon(self):
        result=get_rest_call(self, 'http://localhost:5000/pokemon/3907')
        expected="Volcarona"
        self.assertEqual(result[0],expected)