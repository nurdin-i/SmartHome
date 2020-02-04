module SmartHome(
	input clk,
	input wire rdy_clr,
	input wire rx, 
	output wire rdy,	
	output led1,
	output led2,
	output led3,
	output led4,
	output dioda,
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
	.led1(led1),
	.led2(led2),
	.led3(led3),
	.led4(led4),
	.dioda(dioda),
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