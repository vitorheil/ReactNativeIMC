import React, { useState } from 'react'
import { View, Text,TextInput, TouchableOpacity,Vibration, Pressable, Keyboard, FlatList } from 'react-native'
import ResultImc from "./ResultImc/index"
import styles from "./style"


export default function Form(props){

    const [height, setHeight] = React.useState(null)
    const [weight, setWeight] = React.useState(null)
    const [messageImc, setMessageImc] = useState(null)
    const [imc, setImc] = useState(null)
    const [textButton, setTextButton] = useState("Calcular")
    const [errorMessage, setErrorMessage] = useState(null)
    const [imcList, setImcList] = useState([])
    
    function imcCalculator(){
        let heightFormat = height.replace(",",".")
        let totalImc= (weight/(heightFormat*heightFormat)).toFixed(2)
        setImcList((arr)=>[...arr, {id: new Date().getTime(), imc: totalImc}])
        setImc(totalImc)
    }

    function verificationIMC(){
        if(weight == null && height == null ){
            Vibration.vibrate()
            setErrorMessage("Campo obrigatório")
        }
       
        
    }

    function validationImc(){
        if(weight != null && height != null){
            imcCalculator()
            setHeight(null)
            setWeight(null)
            setMessageImc("Seu IMC é igual:")
            setTextButton("Calcular Novamente")
            setErrorMessage(null)
            
        }
        else{
        verificationIMC()
        setImc(null)
       setTextButton("Calcular")
       setMessageImc("Preencha o peso e altura")
        }
       
    }

    
    return (

        
           <View style={styles.formContext}>
               {imc == null ? 
           <Pressable onPress={Keyboard.dismiss} style={styles.form}>
               <Text style={styles.formLabel}>Altura</Text>
               <Text style={styles.errorMessage}>{errorMessage}</Text>
               <TextInput
               style={styles.input}
               onChangeText={setHeight}
               value={height}
               placeholder="Ex. 1.75"
               KeyboardType="numeric"
               />
               <Text style={styles.formLabel}>Peso</Text>
               <Text style={styles.errorMessage}>{errorMessage}</Text>
               <TextInput
               style={styles.input}
               onChangeText={setWeight}
               value={weight}
               placeholder="Ex. 75"
               KeyboardType="numeric"
               />
               
               <TouchableOpacity
               style={styles.buttonCalculator}
               onPress={()=>{
                   validationImc()
               }}
               >
                   <Text style={styles.textButtonCalculator}>{textButton}</Text>
               </TouchableOpacity>
               </Pressable>
               : 
               <View style={styles.exhibitionResultImc}>
           <ResultImc messageResultImc={messageImc} resultImc={imc}/>
           <TouchableOpacity
               style={styles.buttonCalculator}
               onPress={()=>{
                   validationImc()
               }}
               >
                   <Text style={styles.textButtonCalculator}>{textButton}</Text>
               </TouchableOpacity>
           </View>
}
          <FlatList
          showsVerticalScrollIndicator ={false}
          style={styles.listImcs}
          data={imcList}
          renderItem={({item}) =>{
              return(  
                    <Text style={styles.resultImcItem}>
                      <Text style={styles.textResultItemList}>Resultado IMC = </Text>
                      {item.imc}
                      </Text>
              )
          }}
          keyExtractor={(item)=>{
              item.id
          }}
          >

          </FlatList>
        </View>
    )
}
