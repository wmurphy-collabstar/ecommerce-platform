import React from "react"
import Welcome from "./payment-components/Welcome"
import OrderForm from "./payment-components/OrderForm"
import OrderSummary from "./payment-components/OrderSummary"
import DeliveryForm from "./payment-components/DeliveryForm"
import DeliverySummary from "./payment-components/DeliverySummary"
import ShippingForm from "./payment-components/ShippingForm"
import ShippingSummary from "./payment-components/ShippingSummary"
import BillingForm from "./payment-components/BillingForm"
import BillingSummary from "./payment-components/BillingSummary"
import PaymentForm from "./payment-components/PaymentForm"
import PaymentSummary from "./payment-components/PaymentSummary"
import Submit from "./payment-components/Submit"
import {useLocation} from "react-router-dom"
import {PhoneInput, isValidPhoneNumber} from 'react-phone-number-input'
import { DateField } from '@mui/x-date-pickers/DateField'

/*Page to checkout after order is confirmed. It contains a series of forms to fill out,
which then can be double checked via the summaries for each step
*/
export default function Checkout(){
    const location = useLocation()
    const {order, totalPrice} = location.state

    const [formCompletion, setFormCompletion] = React.useState(
        {
            orderFilled: false,
            deliveryFilled: false,
            shippingFilled: false,
            billingFilled: false,
            paymentFilled: false
        }
    )
    const [currentForm, setCurrentForm] = React.useState("welcome")
    const [fullyComplete, setFullyComplete] = React.useState(false)
    const [deliveryFee, setDeliveryFee] = React.useState({
        "Standard": {
            time: "7 days",
            price: 4.99, 
            chosen: false,
            totalPrice: totalPrice+4.99,
            moreInfo: ""
        },
        "Expedited":{
            time: "2-3 days",
            price: 10,
            chosen: false,
            totalPrice: totalPrice+10,
            moreInfo: ""
        },
        "Relaxed":{
            time: "2-3 weeks",
            price: 0,
            chosen: false,
            totalPrice: totalPrice,
            moreInfo:""
        }
    })
    const [shippingAdd, setShippingAdd] = React.useState({
        firstName: "",
        lastName: "",
        streetAddress: "",
        city: "",
        inUS: false,
        state: "",
        country: "",
        zipcode: "",
        email: "",
        phone: ""
    })
    const [billingAdd, setBillingAdd] = React.useState({
        firstName: "",
        lastName: "",
        streetAddress: "",
        city: "",
        inUS: false,
        state: "",
        country: "",
        zipCode: "",
        email: "",
        phone: ""
    })
    const [payment, setPayment] = React.useState({
        nameOnCard:"",
        cardNumber: "",
        dateOfExpiration: "",
        CVV: "",
        zipCode: ""
    })

    const [listOfCountries, setListOfCountries] = React.useState([])
    const listOfStates = [
        "Alabama",
        "Alaska",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "Florida",
        "Georgia",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Jersey",
        "New Mexico",
        "New York",
        "North Carolina",
        "North Dakota",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Pennsylvania",
        "Rhode Island",
        "South Carolina",
        "South Dakota",
        "Tennessee",
        "Texas",
        "Utah",
        "Vermont",
        "Virginia",
        "Washington",
        "West Virginia",,
        "Wisconsin",
        "Wyoming"
    ]

    if (formCompletion.orderFilled &&
            formCompletion.deliveryFilled &&
            formCompletion.shippingFilled &&
            formCompletion.billingFilled &&
            formCompletion.paymentFilled){
        setFullyComplete(true)
    } 

    function validName(value){
        return /^[A-Za-z]+$/.test(value)
    }

    function validStreetAdd(value){
        return /^[A-Za-z0-9. ]+$/.test(value)
    }

    function validCity(value){
        return /^[A-Za-z ]+$/.test(value)
    }

    React.useEffect(() => {
        const output = fetch("https://restcountries.com/v3.1/all")
            .then((res) => res.json())
            .catch((error) => "Here is your error: "+ error)
        
        setListOfCountries(typeof output === "string" ? [] : output)
    }, [1])

    function validZipCode(value){
        return /^\d{5}(-\d{4})?$/.test(value)
    }

    function validCardNumber(value){
        if(/^[0-9]{13,19}$/.test(value)){
            return luhnCheck(value)
        }else {
            return false
        }
    }

    function validCVV(value){
        return /^[0-9]{3,4}$/.test(value)
    }


    function luhnCheck(value){
        let checksum = 0; // running checksum total
        let j = 1; // takes value of 1 or 2
    
        // Process each digit one by one starting from the last
        for (let i = value.length - 1; i >= 0; i--) {
          let calc = 0;
          // Extract the next digit and multiply by 1 or 2 on alternative digits.
          calc = Number(value.charAt(i)) * j;
    
          // If the result is in two digits add 1 to the checksum total
          if (calc > 9) {
            checksum = checksum + 1;
            calc = calc - 10;
          }
    
          // Add the units element to the checksum total
          checksum += calc;
    
          // Switch the value of j
          if (j == 1) {
            j = 2;
          } else {
            j = 1;
          }
        }
      
        //Check if it is divisible by 10 or not.
        return (checksum % 10) == 0;
    }

    return (
        <>
            <Welcome state={[currentForm, setCurrentForm]}/>
            <OrderForm 
                state={[currentForm, setCurrentForm]} 
                formState={[formCompletion, setFormCompletion]}
                order={order}
                totalPrice={totalPrice}
                />
            <OrderSummary 
                state={[currentForm, setCurrentForm]} 
                formState={[formCompletion, setFormCompletion]}
                order={order}
                totalPrice={totalPrice}
                complete={fullyComplete}/>
            <DeliveryForm
                state={[currentForm, setCurrentForm]} 
                formState={[formCompletion, setFormCompletion]}
                deliveryState={[deliveryFee, setDeliveryFee]}/>
            <DeliverySummary
                state={[currentForm, setCurrentForm]} 
                formState={[formCompletion, setFormCompletion]}
                deliveryState={[deliveryFee, setDeliveryFee]}
                complete={fullyComplete}/>
            <ShippingForm
                state={[currentForm, setCurrentForm]} 
                formState={[formCompletion, setFormCompletion]}
                shippingState={[shippingAdd, setShippingAdd]}
                validFunctions={[validName, validStreetAdd, validCity,
                    validZipCode]}
                lists={[listOfCountries, listOfStates]}/>
            <ShippingSummary
                state={[currentForm, setCurrentForm]} 
                formState={[formCompletion, setFormCompletion]}
                shippingState={[shippingAdd, setShippingAdd]}
                complete={fullyComplete}
                validFunctions={[validName, validStreetAdd, validCity, 
                    validZipCode]}
                lists={[listOfCountries, listOfStates]}/>
            <BillingForm
                state={[currentForm, setCurrentForm]} 
                formState={[formCompletion, setFormCompletion]}
                billingState={[billingAdd, setBillingAdd]}
                validFunctions={[validName, validStreetAdd, validCity, 
                    validZipCode, isValidPhoneNumber]}
                phoneComp = {PhoneInput}
                lists={[listOfCountries, listOfStates]}/>
            <BillingSummary
                state={[currentForm, setCurrentForm]} 
                formState={[formCompletion, setFormCompletion]}
                billingState={[billingAdd, setBillingAdd]}
                complete={fullyComplete}
                validFunctions={[validName, validStreetAdd, validCity, 
                    validZipCode, isValidPhoneNumber]}
                phoneComp = {PhoneInput}
                lists={[listOfCountries, listOfStates]}/>
            <PaymentForm
                state={[currentForm, setCurrentForm]} 
                formState={[formCompletion, setFormCompletion]}
                paymentState={[payment, setPayment]}
                validFunctions={[validName, validCardNumber,
                    validCVV, validZipCode]}
                dateComp = {DateField}/>
            <PaymentSummary
                state={[currentForm, setCurrentForm]} 
                formState={[formCompletion, setFormCompletion]}
                paymentState={[payment, setPayment]}
                complete={fullyComplete}
                validFunctions={[validName, validCardNumber,
                    validCVV, validZipCode]}
                dateComp = {DateField}/>
            <Submit
                finished={fullyComplete}/>
        </>
    )
}