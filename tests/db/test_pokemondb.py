import unittest
from src.db.db_builder import *
import random

class TestPokemonDB(unittest.TestCase):
    def test_random_pokemon(self):
        random.seed(3907)
        result=random_pokemon("Both")
        expected="Volcarona"
        self.assertEqual(result[0],expected)

    def test_random_pokemon_not_fully_evolved(self):
        result=random_pokemon("No")
        expected="No"
        self.assertEqual(result[8],expected)
    
    def test_random_pokemon_fully_evolved(self):
        result=random_pokemon("Yes")
        expected="Yes"
        self.assertEqual(result[8],expected)

    def test_guess_pokemon_correct(self):
        random.seed(3907)
        pokemon=random_pokemon("Both")
        result=check_guess(pokemon,"Volcarona")
        expected="Correct!"
        self.assertEqual(result,expected)

    def test_guess_pokemon_incorrect(self):
        random.seed(3907)
        pokemon=random_pokemon("Both")
        result=check_guess(pokemon,"Pikachu")
        expected="Incorrect! The Correct Answer Was Volcarona"
        self.assertEqual(result,expected)

    def test_guess_pokemon_caps_check(self):
        random.seed(3907)
        pokemon=random_pokemon("Both")
        result=check_guess(pokemon,"VOLCARONA")
        expected="Correct!"
        self.assertEqual(result,expected)
    
if __name__ == '__main__':
    unittest.main()