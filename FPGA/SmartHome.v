module SmartHome(

	input clk,
	input wire rdy_clr,
	input wire rx, 
	
	output wire rdy,	
	output led1,
	output wire rxclk
);

//Varijable potrebne za komunikaciju.
wire [7:0] rxdata;

main MAIN(
	.clk(clk),
	.led1(led1),
	.rxdata(rxdata)
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

endmodule