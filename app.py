from flask import Flask, render_template, request, jsonify, json, redirect, make_response
import os
app = Flask(__name__)


cur_step = 1

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/workbench')
def workbench():
    return render_template('workbench.html')

@app.route('/add_part', methods=['POST'])
def construct():
    global cur_step
    if request.method == 'POST':
        if request.form['submit'] == 'Next':
            instruction = request.form['instruction']
            code = request.form['code']
            print instruction, code
            add_part(instruction, code, cur_step)
            cur_step += 1
            return redirect('/workbench')

        elif request.form['submit'] == 'Finish':
            instruction = request.form['instruction']
            code = request.form['code']
            print instruction, code
            add_part(instruction, code, cur_step)
            cur_step = 1

            finished_tutorial = get_result()
            print finished_tutorial

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
            response.headers["Content-Disposition"] = "attachment; filename=tutorial.html"

            remove_file()
            return response

        elif request.form['submit'] == 'Finish':
            remove_file()
            return redirect('/')
        else:
            pass

    return redirect('/')

def add_part(instruction, code, step):
    with open('tutorial', 'a') as f:
        f.write("step %d\n" % step)
        f.write("\n------------------------------------------------\n")
        f.write("\n%s\n" % instruction)
        f.write("\n\n%s\n" % code)

def get_result():
    with open('tutorial', 'r') as f:
        return f.read().replace('\n', '<br>')

def remove_file():
    myfile = "tutorial"
    if os.path.isfile(myfile):
        os.remove(myfile)



if __name__ == '__main__':
    app.run(
        debug=True,
    )
