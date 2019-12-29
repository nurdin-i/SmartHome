module baud_rate_gen(input wire clk, 
							output wire rxclk);

	parameter RX_ACC_MAX = 50000000 / (9600 * 16);
	parameter RX_ACC_WIDTH = $clog2(RX_ACC_MAX);

	reg [RX_ACC_WIDTH - 1:0] rx_acc = 0;

	assign rxclk = (rx_acc == 5'd0);

	always @(posedge clk) begin
	if (rx_acc == RX_ACC_MAX[RX_ACC_WIDTH - 1:0])
		rx_acc <= 0;
	else
		rx_acc <= rx_acc + 5'b1;
	end

endmodule
