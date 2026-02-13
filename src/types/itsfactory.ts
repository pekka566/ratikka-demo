// ItsFactory Journeys API Response Types
// API Documentation: http://data.itsfactory.fi/journeys/api/1/

export interface ItsFactoryLine {
  name: string
  description: string
  url: string
}

export interface ItsFactoryStopPoint {
  url: string
  location: string // Format: "61.49848,23.7707"
  name: string
  shortName: string
  tariffZone: string
}

export interface ItsFactoryJourneyPattern {
  url: string
  name: string
  lineUrl: string
  directionId: string
  stopPoints: ItsFactoryStopPoint[]
}

export interface VehicleActivity {
  recordedAtTime: string
  monitoredVehicleJourney: {
    lineRef: string
    directionRef: string
    operatorRef: string
    framedVehicleJourneyRef: {
      dataFrameRef: string
      datedVehicleJourneyRef: string
    }
    vehicleLocation: {
      longitude: string
      latitude: string
    }
    bearing: string
    delay: string
    vehicleRef: string
    journeyPatternRef: string
    originShortName: string
    destinationShortName: string
    onwardCalls?: Array<{
      expectedDepartureTime: string
      expectedArrivalTime: string
      stopPointRef: string
      stopPointName: string
      order: string
    }>
  }
}

export interface ItsFactoryApiResponse<T> {
  status: string
  body: T
}
