import concat from "lodash/concat"
import flatMap from "lodash/flatMap"

import {
  StopResultData,
  StoptimesForServiceDate,
  Times,
  Stoptimes,
  Stop
} from "../../types"

const nowDate = new Date()
const midNight = new Date().setUTCHours(0, 0, 0, 0)

const timeToDate = (time: number): Date => {
  const date = new Date(midNight)
  date.setSeconds(time)
  return date
}

const getDeparture = (stoptimes: Array<Stoptimes> | undefined): Array<Date> =>
  stoptimes ? stoptimes.map((x) => timeToDate(x.realtimeDeparture)) : []

const getStopTimes = (
  stoptimesForServiceDate: Array<StoptimesForServiceDate> | undefined,
  maxNumOfResults: number
): Array<Date> => {
  if (!stoptimesForServiceDate) return []

  const allStopDates = flatMap(
    concat(stoptimesForServiceDate.map((x) => getDeparture(x.stoptimes)))
  )
  const sortedDates = allStopDates.filter((x) => x >= nowDate).sort()
  return sortedDates.length > maxNumOfResults
    ? sortedDates.splice(0, maxNumOfResults)
    : sortedDates
}

const convertStopData = (
  stopResultData: StopResultData,
  maxNumOfResults = 5
): Times => {
  const resultStop = stopResultData.data.stop
  const { stoptimesForServiceDate } = resultStop
  const departureTimes = getStopTimes(stoptimesForServiceDate, maxNumOfResults)

  return {
    departureTimes
  }
}

const getStop = (id: string, stops?: Array<Stop>): Stop | undefined =>
  stops?.find((x) => x.id === id)

export { convertStopData, getStop }
