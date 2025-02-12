// I/O's  Inputs (Entradas)
// Outputs (Saídas)

//Definição/criação de variaveis
#define BUTTON_PIN 2
#define LED_PIN 1


bool button = 0, led = 0;

//configurações
void setup()   //executada apenas uma vez, logo após o Arduino ser ligado ou resetado
{
    pinMode(BUTTON_PIN,INPUT_PULLUP);
    pinMode(LED_PIN,OUTPUT);
}
//lógica
void loop()   //executada continuamente, repetindo-se em um ciclo infinito
{
    //I/O'S:
    button = !digitalRead(BUTTON_PIN);
    digitalWrite(LED_PIN, led);


    if( button == HIGH ){  
       led = 1;
    }
    else{
        led = 0;
    }
}