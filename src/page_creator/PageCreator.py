
from jinja2 import Template


"""
{
    'title': 'Some title',
    'css_links': [
        'link one',
        'link two'
    ],
    'steps': [
        {
            'step_number': 1,
            'instruction': 'some instruction',
            'example_code': 'some example_code'
        },
        {
            'step_number': 2,
            'instruction': 'some instruction',
            'example_code': 'some example_code'
        },
        {
            'step_number': 3,
            'instruction': 'some instruction',
            'example_code': 'some example_code'
        }
    ]
}
"""

PAGE_TEMPLAE = """
<!DOCTYPE html>
<html>
    <head>
        <meta charset='utf-8'>
        <meta http-equiv="X-UA-Compatible" content="chrome=1">

        {% for css_link in css_links %}
        <link rel="stylesheet" type="text/css" href="{{ css_link }}" media="screen">
        {% endfor %}

        <title>Simple Tutorial</title>
    </head>
    <body>
        <header>
            <div class="container">
                <h1>{{ title }}</h1>

            </div>
        </header>
        <div class="container">
            <section id="main_content">

            {% for step in steps -%}
                <h3>
                    <a id="welcome-to-github-pages" class="anchor" href="#welcome-to-github-pages" aria-hidden="true">
                        <span class="octicon octicon-link"></span>
                    </a>Step {{ step['step_number'] }}
                </h3>

                {% if step['instruction']|length > 0 %}
                <p>{{ step['instruction'] }}</p>
                {% endif %}

                {% if step['example_code']|length > 0 %}
                <pre><code>{{ step['example_code'] }}</pre></code>
                {% endif %}

            {% endfor %}

            </section>
        </div>
    </body>
</html>
"""


class Creator():
    def __init__(self, title):
        self.template_location = "templates/" + title.replace(' ', '-') + ".html"

        self.title = title
        self.css_links = [
            "http://kevcoxe.github.io/Simple-Flask-App/stylesheets/stylesheet.css",
            "http://kevcoxe.github.io/Simple-Flask-App/stylesheets/pygment_trac.css",
        ]
        self.steps = []

    def reset_steps(self):
        self.steps = []

    def add_to_page(self, step_number, instruction, code):
        self.steps.append({
            'step_number': step_number,
            'instruction': instruction,
            'example_code': code
        })

    def create_page(self):
        t = Template(PAGE_TEMPLAE)

        # get arguments for template
        rendered_contents = t.render(
            title=self.title,
            css_links=self.css_links,
            steps=self.steps
        )

        with open(self.template_location, 'a') as f:
            f.write(rendered_contents)

