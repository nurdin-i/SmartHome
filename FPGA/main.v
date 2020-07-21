module main(clk,
				kitchenlight,
				livinglight,
				dininglight,
				frontlight,
				garagelight,
				backlight,
				beepBuzzer,
				vent1A,
				vent1B,
				vent2A,
				vent2B,
				heater,
				sensorOutside1,
				sensorOutside2,
				beepBuzzer,
				servoGarageDoor,
				rxdata,
				txdata,
				dataValid,
				dataValidRX);

input clk;

output reg beepBuzzer;
output reg vent1A;
output reg vent1B;
output reg vent2A;
output reg vent2B;
output reg heater;

output reg garagelight;
output reg backlight;
output reg kitchenlight;
output reg livinglight;
output reg dininglight;
output reg frontlight;

input wire [7:0] rxdata;
input wire sensorOutside1;
input wire sensorOutside2;
reg [31:0] counter;
reg [31:0] counterOutside; 
reg statusOutside;
reg alarmSystem;



output reg [7:0] txdata;
output reg dataValid;
output reg dataValidRX;
reg [26:0] brojacSlanje = 0;

output wire servoGarageDoor;
reg[25:0] brojac; 	// brojac za servov
reg[25:0] impuls; 	//impuls za servov
reg[25:0] getservoGarageDoor; 		//izlaz za servov

assign servoGarageDoor = getservoGarageDoor;

initial begin
	alarmSystem <= 1'b0;
	kitchenlight <= 1'b0;
	livinglight <= 1'b0;
	dininglight <= 1'b0;
	frontlight <= 1'b0;
	garagelight <= 1'b0;
	backlight <= 1'b0;
	vent1A <= 1'b0;
	vent1B <= 1'b0;
	vent2A <= 1'b0;
	vent2B <= 1'b0;
	heater <= 1'b1;
	beepBuzzer <= 1'b1;
end

 
always @(posedge clk)
begin
case (rxdata)
	3: begin
		alarmSystem = 1'b1;
		end 
	4: begin
		alarmSystem = 1'b0;
		end
	7: begin
		kitchenlight = 1'b1; 
		end
	8: begin
			kitchenlight = 1'b0;
		end
	9: begin
			livinglight = 1'b1; 
		end
	10: begin
			livinglight = 1'b0;
		 end
	11: begin
			dininglight = 1'b1; 
		 end
	12: begin
			dininglight = 1'b0;
		 end
	13: begin
			frontlight = 1'b1; 
		 end
	14: begin
			frontlight = 1'b0;
		 end
	15: begin
			garagelight = 1'b1; 
		 end
	16: begin
			garagelight = 1'b0;
		 end
	17: begin
			backlight = 1'b1; 
		 end
	18: begin
			backlight = 1'b0;
		 end
	21: begin //ventilatori upaljeni
			vent1A = 1'b1; 
			vent1B = 1'b0; 
			vent2A = 1'b1; 
			vent2B = 1'b0; 
			end
	26: begin //ventilatori ugaseni
			vent1A = 1'b0; 
			vent1B = 1'b0; 
			vent2A = 1'b0; 
			vent2B = 1'b0; 
		 end
	31: begin 
			heater = 1'b0; 
		 end
	36: begin
			heater = 1'b1; 
		end
endcase
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


always@(posedge clk)
begin
if((sensorOutside1 | sensorOutside2) & (alarmSystem))
	begin
	statusOutside <= 1'b1; // detektovano nesto, sacekati cemo malo prije nego sto ugasimo diodu i zapocnemo ponovno detektovanje
	//kitchenlight <= 1'b1; //pali diodu
	beepBuzzer <= 1'b0;
	end
else if (statusOutside == 1)
	if(counterOutside<=1*50000000) // 4 sekunde cekamo
		counterOutside <=counterOutside+1;
	else
	begin
	statusOutside <= 1'b0;
	counterOutside <=0;
	//kitchenlight <=1'b0;
	beepBuzzer <= 1'b1;
	end
end


// pokretanje servo-a za vrata
always@( posedge clk )
begin
if(rxdata==5)
impuls<=25'd45000; 
else if(rxdata==6)
impuls<=25'd115000; 

if( brojac<impuls ) //Generisanje impulsa
begin
getservoGarageDoor<=25'b1;
brojac<=brojac+25'd1;
end
else if( brojac >= impuls && brojac < impuls+25'd1000000) //Pauza 20ms
begin
brojac<=brojac+25'd1;
getservoGarageDoor<=25'b0;
end
else //Resetovanje brojača
brojac<=25'd0;
end

endmodule


