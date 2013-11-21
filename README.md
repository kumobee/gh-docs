# GitHub Repository Documentation

This simple tool generate a static documentation website which use the GitHub API to read markdown file. It is usefull for gh-pages static documentation website that you don't need to change (only change the markdown docs files in your repository).

### How to use it?

```
# Clone the repository
$ git clone https://github.com/SamyPesse/gh-docs.git
$ cd gh-docs

# Install dependencies
$ npm install .

# Change configuration
$ nano ./config.json

# Build the website
$ make

# The output is in the build directory
```


### Configuration

```
{
    "title": "Codebox Documentation",
    "description": "Documentation for using Codebox.io",
    "favicon": "https://www.codebox.io/static/images/favicon.png",
    
    "repo": "FriendCode/codebox-client",
    "debug": true,
    "entry": "README",
    "styles": {
        "header": {
            "background": "#3c4042 url(https://www.codebox.io/static/images/bg.jpg)",
            "background-size": "cover"
        }
    }
}
```