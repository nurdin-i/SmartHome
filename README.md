# SmartHome
SmartHome project - FPGA and Arduino

This project was developed as a part of a bachelor theses at the Faculty of Engineering in Tuzla. The idea behind was to utilize various technologies and tools to create a Smart Home System that would
server as a showcase of what can we accomplish when we combine both FPGA and Arduino tools. 

![Smart Home System](https://i.imgur.com/xGEBd3B.png)

Technologies used are:

* HTML, Javascript and CSS for website that is optimized for desktop and mobile
* Verilog as a hardware descriptive language used to control FPGA 
* Arduino programming language to control ESP32.
* MySQL and PHP to create a database and store data.

Devices used to create a model of a Smart Home System are: 

* FPGA Cyclone IV EP4CE6
* ESP32 Arduino
* DHT11 and DHT22 sensors 
* PIR Sensors
* LED diode
* L9110 ventilators
* Hair dryer

The basic logic behind the smart home system follows: 
* User can use both mobile or desktop to navigate through the web page. 
* By clicking on any of the buttons available, user is able to perform a certain command. 
* Command is processed through HTTP request. HTTP request is created with a predefined value for each button that is sent through UART to Cyclone IV board. 
* Cyclone IV board recieves the command and follows through with adequate action. 
* In case of an action requested by the user that is done specifically on Arduino, there is no need for UART communication as Arduino does all the heavy-lifting.
* Sensors continually track the state of temperature/humidity inside and around the house - Asynchronous web server used to update state real-time. 
* Regulation of temperature is implemented using Fuzzy controler on Arduino system. 
* Data can be stored up to few days/weeks/months by using HTTP POST requests to send data to outside website, process it in PHP and store into a table and then pull data from the table using another PHP script to 
visualize and monitor status of temperature/humidity.

Smart Home Website:

![Smart Home System](https://i.imgur.com/d2mKvhV.jpg) 

Smart Home video representation: https://www.youtube.com/watch?v=SSbIjH7crrw
