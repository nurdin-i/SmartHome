/*********
  Nurdin Ibrisimovic
  Date: TBD
*********/

#include <DHT.h>
#include "WiFi.h" //Wifi library to connect to your WIFI network
#include "ESPAsyncWebServer.h" // Library for creation of server on your local network
#include "SPIFFS.h" // Library that allows uploading data (index.html, javascript, css) to your ESP32)
#include <HardwareSerial.h> // Library for Serial communication ESP32 - FPGA

HardwareSerial SerialESP(2); //Create an object on UART 2 (ESP32 has few UA

#define RXD2 16 // RX pin 
#define TXD2 17 // TX pin
#define InsideDHTPin 5
#define OutsideDHTPin 18


DHT OutDHT(OutsideDHTPin, DHT11);
DHT InDHT(InsideDHTPin, DHT22); //Create a DHT22 object

// Network credentials
const char* ssid = "8cbea0";
const char* password = "232125668";

// Create AsyncWebServer object on port 80
AsyncWebServer server(80);


// function to read temperature from inside DHT sensor
String readDHTTemp() {
  // Read temperature as Celsius (the default)
  float temperature = InDHT.readTemperature();
  if (isnan(temperature)) {
    Serial.println("Failed to read from BME280 sensor!");
    return "";
  }
  else {
    return String(temperature);
  }
}

String readDHTHumidity() {
  // Read temperature as Celsius (the default)
  float humidity = InDHT.readHumidity();
  if (isnan(humidity)) {
    Serial.println("Failed to read from BME280 sensor!");
    return "";
  }
  else {
    return String(humidity);
  }
}


String readDHTOutTemperature() {
  // Read temperature as Celsius (the default)
  float temperature = OutDHT.readTemperature();
  if (isnan(temperature)) {
    Serial.println("Failed to read from BME280 sensor!");
    return "";
  }
  else {
    return String(temperature);
  }
}


String readDHTOutHumidity() {
  // Read temperature as Celsius (the default)
  float humidity = OutDHT.readHumidity();
  if (isnan(humidity)) {
    Serial.println("Failed to read from BME280 sensor!");
    return "";
  }
  else {
    return String(humidity);
  }
}


void setup() {

  /* Before uploading code, go to TOOLS -> ESP32 Sketch Data Upload to upload your files.
      After building and uploading the code, if ESP32 used, while 'connecting..._..._' part is displayed, hold 'BOOT' button on ESP32 to load data.
      After code is uploaded to ESP32, server is opened on local port 80. We use API requests to communicate with that server and our website.
      GET request -> after clicking a button for example, we send a HTTP request to do a specific thing either turn on diode, read data or whatever.
      All buttons that have funcionality are related with /function option that allows us to control them and do different things.
      We can also send data with GET request and based off of that data that we send to FPGA, FPGA will act differently and do things related to that button.
  */

  // Serial port for sending data from ESP to FPGA
  SerialESP.begin(9600, SERIAL_8N1, RXD2, TXD2);
  // Serial port for debugging purposes
  Serial.begin(9600);

  // Initialize SPIFFS
  if (!SPIFFS.begin(true)) {
    Serial.println("An Error has occurred while mounting SPIFFS");
    return;
  }

  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi..");
  }

  // Print ESP32 Local IP Address where your server is hosted
  Serial.println(WiFi.localIP());

  // Route for root / web page
  server.on("/index.html", HTTP_GET, [](AsyncWebServerRequest * request) {
    request->send(SPIFFS, "/index.html");
  });

  // Route for data.html file
  server.on("/data.html", HTTP_GET, [](AsyncWebServerRequest * request) {
    request->send(SPIFFS, "/data.html");
  });

  // Route to load style.css file
  server.on("/style.css", HTTP_GET, [](AsyncWebServerRequest * request) {
    request->send(SPIFFS, "/style.css", "text/css");
  });

  // Route to load script.js file
  server.on("/script.js", HTTP_GET, [](AsyncWebServerRequest * request) {
    request->send(SPIFFS, "/script.js", "text/javascript");
  });


  // response to HTTP request made from javascript file
  // if GET request with /temperature was sent, send back the value of temperature in plain text
  // 200 is successfull code.

  server.on("/temperature", HTTP_GET, [](AsyncWebServerRequest * request) {
    request->send_P(200, "text/plain", readDHTTemp().c_str());
  });

  server.on("/humidity", HTTP_GET, [](AsyncWebServerRequest * request) {
    request->send_P(200, "text/plain", readDHTHumidity().c_str());
  });

  server.on("/temperatureOUT", HTTP_GET, [](AsyncWebServerRequest * request) {
    request->send_P(200, "text/plain", readDHTOutTemperature().c_str());
  });

  server.on("/humidityOUT", HTTP_GET, [](AsyncWebServerRequest * request) {
    request->send_P(200, "text/plain", readDHTOutHumidity().c_str());
  });



  server.on("/alarmsystem", HTTP_GET, [](AsyncWebServerRequest * request) {
    //if GET request that is linked to /ledroom1 has a parameter named led1, then read the value of that parameter
    if (request->hasParam("alarm")) {
      int byteVal = (request->getParam("alarm")->value().toInt());  //value() returns STRING which we convert to INT
      char charVal = byteVal; //INT is converted to char because on recieving END we decode characters of 8 bit
      Serial.print("saljem alarm");
      SerialESP.print(charVal); // send character to FPGA
    }
    request->send(SPIFFS, "/index.html");
  });

  server.on("/garagedoors", HTTP_GET, [](AsyncWebServerRequest * request) {
    //if GET request that is linked to /ledroom1 has a parameter named led1, then read the value of that parameter
    if (request->hasParam("garageopen")) {
      int byteVal = (request->getParam("garageopen")->value().toInt());  //value() returns STRING which we convert to INT
      char charVal = byteVal; //INT is converted to char because on recieving END we decode characters of 8 bit
      SerialESP.print(charVal); // send character to FPGA
    }
    request->send(SPIFFS, "/index.html");
  });

  server.on("/kitchenlight", HTTP_GET, [](AsyncWebServerRequest * request) {
    //if GET request that is linked to /ledroom1 has a parameter named led1, then read the value of that parameter
    if (request->hasParam("kitchen")) {
      int byteVal = (request->getParam("kitchen")->value().toInt());  //value() returns STRING which we convert to INT
      char charVal = byteVal; //INT is converted to char because on recieving END we decode characters of 8 bit
      SerialESP.print(charVal); // send character to FPGA
    }
    request->send(SPIFFS, "/index.html");
  });


    server.on("/livinglight", HTTP_GET, [](AsyncWebServerRequest * request) {
    //if GET request that is linked to /ledroom1 has a parameter named led1, then read the value of that parameter
    if (request->hasParam("living")) {
      int byteVal = (request->getParam("living")->value().toInt());  //value() returns STRING which we convert to INT
      char charVal = byteVal; //INT is converted to char because on recieving END we decode characters of 8 bit
      SerialESP.print(charVal); // send character to FPGA
    }
    request->send(SPIFFS, "/index.html");
  });


    server.on("/dininglight", HTTP_GET, [](AsyncWebServerRequest * request) {
    //if GET request that is linked to /ledroom1 has a parameter named led1, then read the value of that parameter
    if (request->hasParam("dining")) {
      int byteVal = (request->getParam("dining")->value().toInt());  //value() returns STRING which we convert to INT
      char charVal = byteVal; //INT is converted to char because on recieving END we decode characters of 8 bit
      SerialESP.print(charVal); // send character to FPGA
    }
    request->send(SPIFFS, "/index.html");
  });


    server.on("/frontlight", HTTP_GET, [](AsyncWebServerRequest * request) {
    //if GET request that is linked to /ledroom1 has a parameter named led1, then read the value of that parameter
    if (request->hasParam("front")) {
      int byteVal = (request->getParam("front")->value().toInt());  //value() returns STRING which we convert to INT
      char charVal = byteVal; //INT is converted to char because on recieving END we decode characters of 8 bit
      SerialESP.print(charVal); // send character to FPGA
    }
    request->send(SPIFFS, "/index.html");
  });


    server.on("/garagelight", HTTP_GET, [](AsyncWebServerRequest * request) {
    //if GET request that is linked to /ledroom1 has a parameter named led1, then read the value of that parameter
    if (request->hasParam("garage")) {
      int byteVal = (request->getParam("garage")->value().toInt());  //value() returns STRING which we convert to INT
      char charVal = byteVal; //INT is converted to char because on recieving END we decode characters of 8 bit
      SerialESP.print(charVal); // send character to FPGA
    }
    request->send(SPIFFS, "/index.html");
  });


    server.on("/backlight", HTTP_GET, [](AsyncWebServerRequest * request) {
    //if GET request that is linked to /ledroom1 has a parameter named led1, then read the value of that parameter
    if (request->hasParam("back")) {
      int byteVal = (request->getParam("back")->value().toInt());  //value() returns STRING which we convert to INT
      char charVal = byteVal; //INT is converted to char because on recieving END we decode characters of 8 bit
      SerialESP.print(charVal); // send character to FPGA
    }
    request->send(SPIFFS, "/index.html");
  });


  // Route to set GPIO to HIGH
  server.on("/on", HTTP_GET, [](AsyncWebServerRequest * request) {
    SerialESP.write(1);
    request->send(SPIFFS, "/index.html");
  });

  // Route to set GPIO to LOW
  server.on("/off", HTTP_GET, [](AsyncWebServerRequest * request) {
    SerialESP.write(0);
    request->send(SPIFFS, "/index.html");
  });

  server.on("/offbutton2", HTTP_GET, [](AsyncWebServerRequest * request) {
    SerialESP.write(1);
    request->send(SPIFFS, "/index.html");
  });
  // to this

  server.on("/ledroom1", HTTP_GET, [](AsyncWebServerRequest * request) {
    //if GET request that is linked to /ledroom1 has a parameter named led1, then read the value of that parameter
    if (request->hasParam("led1")) {
      int byteVal = (request->getParam("led1")->value().toInt());  //value() returns STRING which we convert to INT
      char charVal = byteVal; //INT is converted to char because on recieving END we decode characters of 8 bit
      SerialESP.print(charVal); // send character to FPGA
    }
    request->send(SPIFFS, "/index.html");
  });

  server.on("/ledroom2", HTTP_GET, [](AsyncWebServerRequest * request) {
    if (request->hasParam("led2")) {
      int byteVal = (request->getParam("led2")->value().toInt());
      char charVal = byteVal;
      SerialESP.print(charVal);
    }
    request->send(SPIFFS, "/index.html");
  });


  // Start server
  server.begin();
  // Start DHT inside and outside sensor
  InDHT.begin();
  OutDHT.begin();
}

void loop() {

  if (SerialESP.available() > 0) {
    Serial.println(SerialESP.read());
    delay(5);
  }

  delay(500);
}
