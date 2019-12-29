module main(clk,led1,rxdata);

input clk;
output led1;
reg led1;
reg [31:0] counter;
input rxdata;
 
always @(posedge clk)
begin

	if(rxdata==0)
	begin
		led1 = 1'b0;
	end
	else
	begin
	led1 = 1'b1;
	end
	
end

endmodule
