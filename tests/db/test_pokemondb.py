import unittest
from src.db.db_builder import *
import random

class TestPokemonDB(unittest.TestCase):
    def test_random_pokemon(self):
        random.seed(1315)
        result=random_pokemon()[0][0]
        expected="Volcarona"
        self.assertEqual(result,expected)
    def test_guess_pokemon_correct(self):
        reset_score()
        random.seed(1315)
        pokemon=random_pokemon()
        result=check_guess(pokemon,"Volcarona")
        expected="Correct!"
        self.assertEqual(result,expected)
        result=get_score()
        expected=1
        self.assertEqual(result,expected)
    def test_guess_pokemon_incorrect(self):
        reset_score()
        random.seed(1315)
        pokemon=random_pokemon()
        result=check_guess(pokemon,"Pikachu")
        expected="Incorrect! The Correct Answer Was Volcarona"
        self.assertEqual(result,expected)
    def test_guess_pokemon_caps_check(self):
        reset_score()
        random.seed(1315)
        pokemon=random_pokemon()
        result=check_guess(pokemon,"VOLCARONA")
        expected="Correct!"
        self.assertEqual(result,expected)
    
if __name__ == '__main__':
    unittest.main()