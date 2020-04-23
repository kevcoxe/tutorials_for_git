import os
from flask import Flask, render_template, request, jsonify, json, redirect, make_response

from PageCreator import Creator

app = Flask(__name__)


cur_step = 1

creator = Creator("Tutorial Page")


@app.route('/')
def index():
    remove_file()
    return render_template('index.html')


@app.route('/workbench')
def workbench():
    if cur_step == 1:
        creator.start_page()
    return render_template('workbench.html')


@app.route('/add_part', methods=['POST'])
def construct():
    global cur_step
    if request.method == 'POST':
        if request.form['submit'] == 'Next':
            instruction = request.form['instruction']
            code = request.form['code']
            creator.add_to_page(cur_step, instruction, code)
            cur_step += 1
            return redirect('/workbench')

        elif request.form['submit'] == 'Finish':
            instruction = request.form['instruction']
            code = request.form['code']
            creator.add_to_page(cur_step, instruction, code)
            cur_step = 1
            finished_tutorial = "Nothing"
            return render_template('result.html', finished_tutorial=finished_tutorial)
        else:
            pass
    elif request.method == 'GET':
        return redirect('/workbench')


@app.route('/start_over', methods=['POST'])
def start_over():
    global cur_step
    if request.method == 'POST':
        if request.form['submit'] == 'Download':
            body = get_result()
            response = make_response(body)
            response.headers["Content-Disposition"] = "attachment; filename=templates/Tutorial-Page.html"
            creator.close_page()
            remove_file()
            return response

        elif request.form['submit'] == 'View':
            creator.close_page()
            return render_template("Tutorial-Page.html")
        else:
            pass

    return redirect('/')


def get_result():
    with open('templates/Tutorial-Page.html', 'r') as f:
        return f.read()


def remove_file():
    myfile = "templates/Tutorial-Page.html"
    if os.path.isfile(myfile):
        os.remove(myfile)


if __name__ == '__main__':
    app.run(
        debug=True,
    )
