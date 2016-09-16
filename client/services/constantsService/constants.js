"use strict";

(function () {

    angular.module('fndParyBoatsApp')
        .factory('constantsService', [function () {

            function getStates() {
                return [
                    { name: 'ALABAMA', abbreviation: 'AL'},
                    { name: 'ALASKA', abbreviation: 'AK'},
                    { name: 'AMERICAN SAMOA', abbreviation: 'AS'},
                    { name: 'ARIZONA', abbreviation: 'AZ'},
                    { name: 'ARKANSAS', abbreviation: 'AR'},
                    { name: 'CALIFORNIA', abbreviation: 'CA'},
                    { name: 'COLORADO', abbreviation: 'CO'},
                    { name: 'CONNECTICUT', abbreviation: 'CT'},
                    { name: 'DELAWARE', abbreviation: 'DE'},
                    { name: 'DISTRICT OF COLUMBIA', abbreviation: 'DC'},
                    { name: 'FLORIDA', abbreviation: 'FL'},
                    { name: 'GEORGIA', abbreviation: 'GA'},
                    { name: 'HAWAII', abbreviation: 'HI'},
                    { name: 'IDAHO', abbreviation: 'ID'},
                    { name: 'ILLINOIS', abbreviation: 'IL'},
                    { name: 'INDIANA', abbreviation: 'IN'},
                    { name: 'IOWA', abbreviation: 'IA'},
                    { name: 'KANSAS', abbreviation: 'KS'},
                    { name: 'KENTUCKY', abbreviation: 'KY'},
                    { name: 'LOUISIANA', abbreviation: 'LA'},
                    { name: 'MAINE', abbreviation: 'ME'},
                    { name: 'MARYLAND', abbreviation: 'MD'},
                    { name: 'MASSACHUSETTS', abbreviation: 'MA'},
                    { name: 'MICHIGAN', abbreviation: 'MI'},
                    { name: 'MINNESOTA', abbreviation: 'MN'},
                    { name: 'MISSISSIPPI', abbreviation: 'MS'},
                    { name: 'MISSOURI', abbreviation: 'MO'},
                    { name: 'MONTANA', abbreviation: 'MT'},
                    { name: 'NEBRASKA', abbreviation: 'NE'},
                    { name: 'NEVADA', abbreviation: 'NV'},
                    { name: 'NEW HAMPSHIRE', abbreviation: 'NH'},
                    { name: 'NEW JERSEY', abbreviation: 'NJ'},
                    { name: 'NEW MEXICO', abbreviation: 'NM'},
                    { name: 'NEW YORK', abbreviation: 'NY'},
                    { name: 'NORTH CAROLINA', abbreviation: 'NC'},
                    { name: 'NORTH DAKOTA', abbreviation: 'ND'},
                    { name: 'OHIO', abbreviation: 'OH'},
                    { name: 'OKLAHOMA', abbreviation: 'OK'},
                    { name: 'OREGON', abbreviation: 'OR'},
                    { name: 'PENNSYLVANIA', abbreviation: 'PA'},
                    { name: 'PUERTO RICO', abbreviation: 'PR'},
                    { name: 'RHODE ISLAND', abbreviation: 'RI'},
                    { name: 'SOUTH CAROLINA', abbreviation: 'SC'},
                    { name: 'SOUTH DAKOTA', abbreviation: 'SD'},
                    { name: 'TENNESSEE', abbreviation: 'TN'},
                    { name: 'TEXAS', abbreviation: 'TX'},
                    { name: 'UTAH', abbreviation: 'UT'},
                    { name: 'VERMONT', abbreviation: 'VT'},
                    { name: 'VIRGIN ISLANDS', abbreviation: 'VI'},
                    { name: 'VIRGINIA', abbreviation: 'VA'},
                    { name: 'WASHINGTON', abbreviation: 'WA'},
                    { name: 'WEST VIRGINIA', abbreviation: 'WV'},
                    { name: 'WISCONSIN', abbreviation: 'WI'},
                    { name: 'WYOMING', abbreviation: 'WY' }
                ];
            }

            function getMonths() {
                return [
                    {
                        month: 'January',
                        index: 0,
                        enabled: true
                    },
                    {
                        month: 'February',
                        index: 1,
                        enabled: true
                    },
                    {
                        month: 'March',
                        index: 2,
                        enabled: true
                    },
                    {
                        month: 'April',
                        index: 3,
                        enabled: true
                    },
                    {
                        month: 'May',
                        index: 4,
                        enabled: true
                    },
                    {
                        month: 'June',
                        index: 5,
                        enabled: true
                    },
                    {
                        month: 'July',
                        index: 6,
                        enabled: true
                    },
                    {
                        month: 'August',
                        index: 7,
                        enabled: true
                    },
                    {
                        month: 'September',
                        index: 8,
                        enabled: true
                    },
                    {
                        month: 'October',
                        index: 9,
                        enabled: true
                    },
                    {
                        month: 'November',
                        index: 10,
                        enabled: true
                    },
                    {
                        month: 'December',
                        index: 11,
                        enabled: true
                    }
                ];
            }


            return {
                getStates: getStates,
                getMonths: getMonths
            }

        }])


})();
