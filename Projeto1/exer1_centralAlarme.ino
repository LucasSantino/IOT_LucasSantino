// Definição das variáveis (pinos)
#define BUTTON_LIGA 0
#define BARREIRA_VERMELHA 1
#define WINDOW_SENSOR1 2
#define WINDOW_SENSOR2 3
#define SALA_SENSOR 4
#define KITCHEN_SENSOR 5
#define QUINTAL_SENSOR 6
#define CORRIDOR_SENSOR 7
#define SIRENE 8


// Configuração
void setup() {
    // Configuração dos sensores como entrada
    pinMode(BUTTON_LIGA, INPUT);
    pinMode(BARREIRA_VERMELHA, INPUT);
    pinMode(WINDOW_SENSOR1, INPUT);
    pinMode(WINDOW_SENSOR2, INPUT);
    pinMode(SALA_SENSOR, INPUT);
    pinMode(KITCHEN_SENSOR, INPUT);
    pinMode(QUINTAL_SENSOR, INPUT);
    pinMode(CORRIDOR_SENSOR, INPUT);
    

    pinMode(SIRENE, OUTPUT); // Configuração da sirene como saída

    
    digitalWrite(SIRENE, LOW); //  sirene inicia desligada
}

//Logica
void loop() {
    // Verifica se o sistema está ligado
    if (digitalRead(BUTTON_LIGA) == HIGH) {
        
        // Verifica as condições para acionar a sirene
        bool barreiraInterrompida = (digitalRead(BARREIRA_VERMELHA) == LOW);
        bool janelaViolada = (digitalRead(WINDOW_SENSOR1) == LOW) || (digitalRead(WINDOW_SENSOR2) == LOW);
        bool movimentoDetectado = (digitalRead(SALA_SENSOR) == HIGH) || (digitalRead(KITCHEN_SENSOR) == HIGH) || 
                                  (digitalRead(QUINTAL_SENSOR) == HIGH) || (digitalRead(CORRIDOR_SENSOR) == HIGH);
        
        // Se alguma condição for verdadeira, ativa a sirene
        if (barreiraInterrompida || janelaViolada || movimentoDetectado) {
            digitalWrite(SIRENE, HIGH); // Liga a sirene
        } else {
            digitalWrite(SIRENE, LOW); // Desliga a sirene
        }
    } else {
        // Se o botão de ligar estiver desligado, mantém a sirene desativada
        digitalWrite(SIRENE, LOW);
    }
}
