import unittest
from src.db.db_builder import *
import random
from tests.test_utils import *

class TestPokemonDB(unittest.TestCase):
    def test_random_pokemon_both_evolved_states(self):
        result=get_rest_call(self, 'http://localhost:5000/pokemon/3907/Both')
        expected="Volcarona"
        self.assertEqual(result[0],expected)
        expected="Yes"
        self.assertEqual(result[8],expected)
        result=get_rest_call(self, 'http://localhost:5000/pokemon/1/Both')
        expected="Sneasel"
        self.assertEqual(result[0],expected)
        expected="No"
        self.assertEqual(result[8],expected)

    
    def test_random_pokemon_not_fully_evolved(self):
        result=get_rest_call(self, 'http://localhost:5000/pokemon/No')
        expected="No"
        self.assertEqual(result[8],expected)
    
    def test_random_pokemon_fully_evolved(self):
        result=get_rest_call(self, 'http://localhost:5000/pokemon/Yes')
        expected="Yes"
        self.assertEqual(result[8],expected)
    
    