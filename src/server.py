from flask import Flask
from flask_restful import Resource, Api
from db.db_builder import rebuild_tables
from api.getpokemon import *
app = Flask(__name__)
api = Api(app)

api.add_resource(GetPokemon, '/pokemon')
api.add_resource(GetPokemonWithSeed, '/pokemon/<int:seed>')

if __name__ == '__main__':
    app.run(debug=True)