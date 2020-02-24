module SmartHome(
	input clk,
	input wire rdy_clr,
	input wire rx, 
	input wire sensorOutside1,
	input wire sensorOutside2,
	output wire rdy,	
	output kitchenlight,
	output livinglight,
	output dininglight,
	output frontlight,
	output garagelight,
	output beepBuzzer,
	output wire servoGarageDoor,
	output vent1A,
	output vent1B,
	output vent2A,
	output vent2B,
	output backlight,
	output wire rxclk,
	output transmitLine,
	output recieveLine
);

wire [7:0] rxdata;
wire dataValid;
wire dataValidRX;
wire [7:0] txdata;

main MAIN(
	.clk(clk),
	.kitchenlight(kitchenlight),
	.livinglight(livinglight),
	.dininglight(dininglight),
	.frontlight(frontlight),
	.garagelight(garagelight),
	.backlight(backlight),
	.beepBuzzer(beepBuzzer),
	.servoGarageDoor(servoGarageDoor),
	.vent1A(vent1A),
	.vent1B(vent1B),
	.vent2A(vent2A),
	.vent2B(vent2B),
	.sensorOutside1(sensorOutside1),
	.sensorOutside2(sensorOutside2),
	.rxdata(rxdata),
	.txdata(txdata),
	.dataValid(dataValid),
	.dataValidRX(dataValidRX)
);

baud_rate_gen BAUD_RATE_GEN(
	.clk(clk),
	.rxclk(rxclk)
);

reciever RECIEVER(
	 .rx(rx),
	 .rdy(rdy),
	 .rdy_clr(rdy_clr),
	 .clk(clk),
	 .clken(rxclk),
	 .data(rxdata)
);

transmitter TRANSMITTER	
(
   .i_Clock(clk),
   .i_TX_DV(dataValid),
   .i_TX_Byte(txdata), 
   .o_TX_Serial(transmitLine)
);

endmodule