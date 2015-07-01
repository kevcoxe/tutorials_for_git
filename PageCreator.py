
class Creator():
    def __init__(self, title):
        self.title = "templates/" + title + ".html"
        self.page_css = [
            "http://kevcoxe.github.io/Simple-Flask-App/stylesheets/stylesheet.css",
            "http://kevcoxe.github.io/Simple-Flask-App/stylesheets/pygment_trac.css",
        ]
        self.header = """
            <!DOCTYPE html>
            <html>
                <head>
                    <meta charset='utf-8'>
                    <meta http-equiv="X-UA-Compatible" content="chrome=1">

                    <link rel="stylesheet" type="text/css" href="%s" media="screen">
                    <link rel="stylesheet" type="text/css" href="%s" media="screen">

                    <title>Simple Tutorial</title>
                </head>
                <body>
                    <header>
                        <div class="container">
                            <h1>%s</h1>

                        </div>
                    </header>
                    <div class="container">
                        <section id="main_content">
            """ % (self.page_css[0], self.page_css[1], self.title[10:-5])

    def start_page(self):
        with open(self.title.replace(' ','-'), 'w') as f:
            f.write(self.header)

    def add_to_page(self, step_number, instruction, code):
        with open(self.title.replace(' ','-'), 'a') as f:
            title = """
                <h3>
                    <a id="welcome-to-github-pages" class="anchor" href="#welcome-to-github-pages" aria-hidden="true">
                        <span class="octicon octicon-link"></span>
                    </a>Step %s
                </h3>""" % (str(step_number))
            f.write(title)
            if not instruction == "":
                tmp_instruction = """<p>%s</p>""" % (instruction)
                f.write(tmp_instruction)
            if not code == "":
                tmp_code = """
                    <pre><code>%s</pre></code>
                    """ % (code.replace('<','&lt;').replace('>','&gt;'))
                f.write(tmp_code)

    def close_page(self):
        print "Closing"
        with open(self.title.replace(' ','-'), 'a') as f:
            footer = """
                            </section>
                        </div>
                    </body>
                </html>
                """
            f.write(footer)

