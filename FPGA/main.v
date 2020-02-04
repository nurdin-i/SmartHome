module main(clk,
				led1,
				led2,
				led3,
				led4,
				dioda,
				rxdata,
				txdata,
				dataValid,
				dataValidRX);

input clk;
output led1;
reg led1;

output led2;
reg led2;

output led3;
reg led3;

output led4;
reg led4;


output dioda;
reg dioda;


reg [31:0] counter;
input wire [7:0] rxdata;


output reg [7:0] txdata;
output reg dataValid;
output reg dataValidRX;
reg [26:0] brojacSlanje = 0; 

initial begin
	led1 <= 1'b0;
	led2 <= 1'b0;
	led3 <= 1'b0;
	led4 <= 1'b0;
end

 
always @(posedge clk)
begin
	if(rxdata==8'd20)
	begin
	led1 <= 1'b1;
	end
	if(rxdata==8'd21)
	begin
	led1 <= 1'b0;
	end
	if(rxdata == 8'd22)
	begin
	led2 <= 1'b1;
	end
	if(rxdata==8'd23)
	begin
	led2 <= 1'b0;
	end
	if(rxdata == 8'd24)
	begin
	led3 <= 1'b1;
	end
	if(rxdata==8'd25)
	begin
	led3 <= 1'b0;
	end
	if(rxdata == 8'd26)
	begin
	led4 <= 1'b1;
	end
	if(rxdata==8'd27)
	begin
	led4 <= 1'b0;
	end
end


always@(posedge clk)
begin
	brojacSlanje = brojacSlanje + 1;
	if(brojacSlanje == 50000000*2) 	// šalje svake 2 sekunde
	begin
		txdata <= rxdata;
		dataValid <= 1;
		brojacSlanje <= 0;
	end
	else dataValid = 0;
end


endmodule


