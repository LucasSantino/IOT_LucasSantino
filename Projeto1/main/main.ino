// I/O input(entradas) 
/ output(saidas)

#define BUTTON_PIN 0
#define LED_PIN 1


// configurações
void setup() 
{
    pinMode(BUTTON_PIN,INPUT);
    pinMode(LED_PIN,OUTPUT);
}


// Lógica
void loop()
{
    if( digitalRead(BUTTON_PIN) == HiGHT ){ 
        digitalWrite(LED_PIN, HiGHT);  
    }
}
