import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import MyRoutineListScreen from './MyRoutineListScreen'
// import {LocaleConfig} from 'react-native-calendars';

// LocaleConfig.locales['fr'] = {
//   monthNames: [
//     'Janvier',
//     'Février',
//     'Mars',
//     'Avril',
//     'Mai',
//     'Juin',
//     'Juillet',
//     'Août',
//     'Septembre',
//     'Octobre',
//     'Novembre',
//     'Décembre'
//   ],
//   monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
//   dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
//   dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
//   today: "Aujourd'hui"
// };
// LocaleConfig.defaultLocale = 'fr';
const date = new Date()

export default function RoutineReservationScreen({ navigation }) {
  const [selectedDay, setSelectedDay] = useState('')
  const [selectedMonth, setSelectedMonth] = useState('')
  const [selectedYear, setSelectedYear] = useState('')
  // const [selectedDay, setSelectedDay] = useState('')
  const [isDateSelected, setIsDateSelected] = useState(false)
  const currentDay = date.getDate()
  const currentMonth = date.getMonth() + 1
  const currentYear = date.getFullYear()
  const today = `${currentYear}-${currentMonth}-${currentDay}`
  
  return (
    <View style={styles.container}>
      <Text>루틴 예약하기!</Text>
      <Calendar style={styles.calendar}
        // // Initially visible month. Default = now
        initialDate={today}
        // // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
        // minDate={'2012-05-10'}
        // // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
        // maxDate={'2012-05-30'}
        // // Handler which gets executed on day press. Default = undefined
        onDayPress={day => {
          console.log('selected day', day);
          setIsDateSelected(!isDateSelected)
          setSelectedDay(day.day)
          setSelectedMonth(day.month)
          setSelectedYear(day.year)
        }}
        // // Handler which gets executed on day long press. Default = undefined
        // onDayLongPress={day => {
        //   console.log('selected day', day);
        // }}
        // // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
        // monthFormat={'yyyy MM'}
        // // Handler which gets executed when visible month changes in calendar. Default = undefined
        // onMonthChange={month => {
        //   console.log('month changed', month);
        // }}
        // // Hide month navigation arrows. Default = false
        // hideArrows={true}
        // // Replace default arrows with custom ones (direction can be 'left' or 'right')
        // renderArrow={direction => <Arrow />}
        // // Do not show days of other months in month page. Default = false
        // hideExtraDays={true}
        // // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
        // // day from another month that is visible in calendar page. Default = false
        // disableMonthChange={true}

        // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
        firstDay={1}

        // // Hide day names. Default = false
        // hideDayNames={true}
        // // Show week numbers to the left. Default = false
        // showWeekNumbers={true}
        // // Handler which gets executed when press arrow icon left. It receive a callback can go back month
        // onPressArrowLeft={subtractMonth => subtractMonth()}
        // // Handler which gets executed when press arrow icon right. It receive a callback can go next month
        // onPressArrowRight={addMonth => addMonth()}
        // // Disable left arrow. Default = false
        // disableArrowLeft={true}
        // // Disable right arrow. Default = false
        // disableArrowRight={true}
        // // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
        // disableAllTouchEventsForDisabledDays={true}
        // // Replace default month and year title with custom one. the function receive a date as parameter
        // renderHeader={date => {
        //   /*Return JSX*/
        // }}

        // Enable the option to swipe between months. Default = false
        enableSwipeMonths={true}
      />
    {isDateSelected && <View>
      <Text> 루틴 고르기 </Text>
      {/* RoutineItem 뿌려주기 */}
    </View>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1.5
  },
  calendar: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  }
})