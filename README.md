# Popup jQuery plugin
jQuery pluging which allows you to make a popup element when hovering parent

This is a really small jQuery plugin, which can create a popup element when hovering the parent element. It also allows you to modify content of created popup by variable or by data-* attributes.

# How to use it:
## You will need to include jQuery(1.7+) and source files
```html
<head>
  <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js"></script>
  <script type="text/javascript" src="../popup.min.js"></script>
  <link rel="stylesheet" href="../popup.min.css" type="text/css">
</head>
```

## Create dataset
  Content of popup element can be modified by option **content**. This option holds the string value of created popup. It can also hold placeholders which will be replaced if the content of the placeholder value is found. Placeholder is char sequence inside of braces "{" and "}" (ex. {key}, {otherKey}, etc.).
  Plugin can use elements data-* attributes or dataset can be defined as variable someware else.
  
### Dataset using data-* attributes
```html
<a href="example.com/u/1" class="userPopup" data-user-name="johny" data-name="John" data-surname="Doe" data-age="25" data-address="NY">John Doe</a>
```

### Dataset using variable
```javascript
var userData = {1: {"userName": "johny", "name": "John", "surname": "Doe", "age": 25, "address": "NY"}};
```
Using of variable expects associated array of key-pair values. Plugin uses option **identificator** for indexing in given array. The option **identificator** is data atribute of hovered element. So correct example looks like this
```html
  <a href="example.com" class="userPopup" data-id="1">John Doe</a>
```

## Calling Popup
### Simple call using data-* attributes
```javascript
  $(function(){$(".userPopup").popUp({
        content: 'Informations about user {userName}.<br /> Name: {name} {surname} <br />Age: {age} <br /> Address: {address}',
        useDataAttrs: true
    });
  });
```

### Simple call using variable
```javascript
  $(function(){$(".userPopup").popUp({
        content: 'Informations about user {userName}.<br /> Name: {name} {surname} <br />Age: {age} <br /> Address: {address}',
        identificator: "id",
        data: userData
    });
  });
```

## Creating repeatable content
This plugin allows you to create repeatable content. Let's say you want to display a table when you hover an element. You can do this similar to example with dataset as variable. The difference is that you need to define an array of associated arrays where are the data. It can look like this.
```javascript
var userData = {1: {"usersCount": 2, "repeat": [{"userName": "johny", "name": "John", "surname": "Doe", "age": 25, "address": "NY"},{"userName": "foobar", "name": "Foo", "surname": "Bar", "age": 25, "address": "foobar"}]}};
```
And then call plugin like this
```javascript
  $(function(){$(".userPopup").popUp({
        content: 'Informations about users. There are {usersCount} users.<table><tr><th>Name</th><th>Surname</th><th>Age</th><th>Address</th></tr>{repeat}</table>',
        contentRepeat: '<tr><td>{name}</td><td>{surname}</td><td>{age}</td><td>{address}</td></tr>',
        identificator: "id",
        data: userData
    });
  });
```

## Options
The plugin functionality can be modified using this options:

| Option name | Default value | Meaning |
| ----------- | ------------- | ------- |
| follow | true | Created popup follows mouse move |
| offset | 10 | Integer value in px to set offset of the popup element from mouse pointer |
| content | "content" | Content of popup element |
| contentRepeat | null | Content to repeat inside the popup (ex. generating tables) |
| repeatKeyword | "{repeat}" | This placeholder is replaced by repeated content |
| data | undefined | Variable which hold data to popup |
| useDataAttrs | false | Plugin will use data attributes of element to grap data |
| timingIn | 750 | Duration of showing effect |
| timingOut | 250 | Duration of hiding effect |
| animationIn | "fadeIn" | Effect used to show popup (can be used "fadeIn", "show") |
| animationOut | "fadeOut" | Effect used to hide popup (can be used "fadeOut", "hide") |
