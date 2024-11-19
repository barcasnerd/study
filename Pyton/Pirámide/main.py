def comprobar_palabra(palabra):
    if palabra[0] != palabra[len(palabra)-1]:
        print('La palabra debe empezar y finalizar en la misma letra')
        return
    
  
def crear_arbol(palabra, indice):
    # constantes
    separador = '  '   
    # casos base
    if indice == 0:            
        print(f'{separador * (len(palabra)-indice)}{palabra[0]}')       
        crear_arbol(palabra, indice + 1)
    elif indice == len(palabra) - 1:
        final = ''
        for letra in palabra:
            final = f'{final}{letra}{separador} '
        print(f'{separador * (len(palabra)-indice)}{final}')            
     # recursividad
    else:        
        print(f'{separador * (len(palabra)-indice)}{palabra[len(palabra)-indice-1]}{separador*((indice+indice-1))}{palabra[indice]}')
        crear_arbol(palabra, indice + 1)


def main():
    palabra = input('Escriba la palabra: \n')
    palabra = palabra.upper()
    comprobar_palabra(palabra)   
    crear_arbol(palabra, 0)

if __name__ == "__main__":
    main()