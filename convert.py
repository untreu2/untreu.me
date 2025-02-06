import markdown
import os

def convert_md_to_html(md_file_path, output_html_path):
    with open(md_file_path, 'r', encoding='utf-8') as md_file:
        md_content = md_file.read()
    html_content = markdown.markdown(md_content)
    html_template = f"""<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>untreu's posts</title>
  <link href="https://fonts.googleapis.com/css2?family=roboto+mono:wght@300;400;700&display=swap" rel="stylesheet">
  <style>
    html, body {{ margin: 0; padding: 0; font-family: 'roboto mono', monospace; background-color: #282828; color: #ebdbb2; line-height: 1.6; }}
    body {{ padding: 40px; }}
    h1, h2, h3, h4, h5, h6 {{ color: #ebdbb2; margin-top: 20px; margin-bottom: 10px; text-align: center; }}
    p {{ margin: 15px 0; font-size: 1.1em; }}
    a {{ color: #83a598; text-decoration: none; }}
    a:hover {{ text-decoration: underline; }}
    img {{ max-width: 100%; height: auto; display: block; margin: 20px auto; }}
    blockquote {{ border-left: 4px solid #83a598; margin: 20px 0; padding: 10px 20px; background-color: #3c3836; color: #d5c4a1; font-style: italic; }}
    code {{ background-color: #3c3836; padding: 3px 6px; border-radius: 4px; font-family: 'roboto mono', monospace; }}
    pre {{ background-color: #3c3836; padding: 15px; border-radius: 8px; overflow-x: auto; }}
    @media (max-width: 600px) {{ body {{ padding: 20px; }} }}
  </style>
</head>
<body>
  {html_content}
</body>
</html>"""
    with open(output_html_path, 'w', encoding='utf-8') as html_file:
        html_file.write(html_template)
    print(f"html file created: {output_html_path}")

if __name__ == "__main__":
    md_file_path = input("enter the path of the markdown file: ").strip()
    if not os.path.exists(md_file_path):
        print("file not found. exiting.")
        exit()
    output_html_path = os.path.splitext(md_file_path)[0] + ".html"
    convert_md_to_html(md_file_path, output_html_path)
