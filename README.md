
# Tutorials For Github


### run local

Example docker command
```
docker run kevcoxe/github-tutorial-generator -p 5000:5000 --name=github-tutorial-generator
# will start the app at (http://localhost:5000)
```

Example docker-compose command
```
# clone this repo
# cd into the repo
docker-compose up

# will start the app at (http://localhost:8000)
```

Example running this just as python
```
cd page_creator
virtualenv venv
. venv/bin/activate
pip install -r requirements.txt
python app.py
# will start the app at (http://localhost:5000)
```


To learn how to make flask apps checkout my
[tutorial](https://github.com/kevcoxe/Simple-Flask-App)
