all:
	coffee -c a.coffee
	haml a.haml > a.html
