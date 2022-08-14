bootstrap-debugger
==================

A small piece of code to debug bootstrap responsive layouts.

This is only a stupid piece of code to debug responsive layouts based on bootstrap framework.
The script add a simple overlay box with basic info that update on resize and scroll events:
<ul>
  <li>version: bootstrap version 2.x or 3.x</li>
  <li>break-point:	bootstrap break point @screen-lg, @screen-md, @screen-sm, @screen-xs</li>
  <li>width:	window.width()</li>
  <li>height:	window.height()</li>
  <li>offsetTop:	window.offsetTop()</li>
</ul>

Example run on jsbin https://output.jsbin.com/kipeya

Credits to detect breakpoints:
http://stackoverflow.com/questions/14441456/how-to-detect-which-device-view-youre-on-using-twitter-bootstrap-api
