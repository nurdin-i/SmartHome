module main(clk,led1);

input clk;
output led1;
reg led1;
reg [31:0] counter;

always @(posedge clk)
begin

	if(counter <= (4*50000000))
	begin
	counter <= counter + 1;
	end
	else
	begin
	counter <= 0;
	led1 <= ~led1;
	end
end

endmodule
