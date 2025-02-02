import markdown
import os

def convert_md_to_html(md_file_path, output_html_path):
    with open(md_file_path, 'r', encoding='utf-8') as md_file:
        md_content = md_file.read()
    
    html_content = markdown.markdown(md_content)
    
    html_template = f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>untreu's blog post</title>
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300;400;700&display=swap" rel="stylesheet">
        <style>
            * {{
                box-sizing: border-box;
            }}
            body {{
                font-family: 'Roboto Mono', monospace;
                margin: 0;
                padding: 40px;
                background-color: #121212;
                color: #e0e0e0;
                line-height: 1.6;
            }}
            h1, h2, h3, h4, h5, h6 {{
                color: #f0f0f0;
                margin-top: 20px;
                margin-bottom: 10px;
            }}
            p {{
                margin: 15px 0;
                font-size: 1.1em;
            }}
            a {{
                color: #81a1c1;
                text-decoration: none;
            }}
            a:hover {{
                text-decoration: underline;
            }}
            img {{
                max-width: 100%;
                height: auto;
                display: block;
                margin: 20px auto;
            }}
            blockquote {{
                border-left: 4px solid #81a1c1;
                margin: 20px 0;
                padding: 10px 20px;
                background-color: #2e2e2e;
                color: #c0c0c0;
                font-style: italic;
            }}
            code {{
                background-color: #2e2e2e;
                padding: 3px 6px;
                border-radius: 4px;
                font-family: 'Roboto Mono', monospace;
            }}
            pre {{
                background-color: #2e2e2e;
                padding: 15px;
                border-radius: 8px;
                overflow-x: auto;
            }}
            @media (max-width: 600px) {{
                body {{
                    padding: 20px;
                }}
            }}
        </style>
    </head>
    <body>
        {html_content}
    </body>
    </html>
    """
    
    with open(output_html_path, 'w', encoding='utf-8') as html_file:
        html_file.write(html_template)
    
    print(f"HTML file created: {output_html_path}")

if __name__ == "__main__":
    md_file_path = input("Enter the path of the Markdown file: ").strip()
    if not os.path.exists(md_file_path):
        print("File not found. Exiting.")
        exit()
    
    output_html_path = os.path.splitext(md_file_path)[0] + ".html"
    convert_md_to_html(md_file_path, output_html_path)
