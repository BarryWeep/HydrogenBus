// controllers/userController.js
const express = require('express');
const router = express.Router();
const db = require('../Database/db');



// 登录页面
router.get('/BusTrackInterface', (req, res) => {

  var neededData = [];
  var chartDate = [];
  var chartAveragespeed = [];
  var chartSocUsed = [];
  var chartEnegeryUsed = [];
  var chartDistanceDriven = [];
  var chartRegenerationRate = [];
  const query = 'SELECT DateTime FROM allstatistics ORDER BY DateTime DESC LIMIT 1 OFFSET 1;';
  db.query(query, (err, DateTimeRequired) => {
    if (err) throw err;
    const utcDate = new Date(DateTimeRequired[0]['DateTime']);

    // Convert to Sydney time (UTC+11)
    const sydneyTimeOffset = 11 * 60; // Sydney is UTC+11, so 11 hours in minutes
    utcDate.setMinutes(utcDate.getMinutes() + sydneyTimeOffset);
    
    // Format to 'YYYY-MM-DD HH:MM:SS'
    const formattedSydneyDate = utcDate.toISOString().slice(0, 19).replace('T', ' ');
    neededData.push(formattedSydneyDate.split(' ')[0]);  // the date until 
    
    const query = "SELECT * FROM allstatistics WHERE DateTime BETWEEN '2023-12-01 05:00:00' and '" + formattedSydneyDate+"' ORDER BY DateTime DESC LIMIT 12";

    db.query(query, (err, results) => {
      if (err) throw err;

      neededData.push( parseInt(parseFloat(results[0]['Hydrolight_1_-_ODO']) - 10058.5));  // the current odo - projectstart odo

      var TotalEnergyDriven = 0.0;
      results.forEach((result,index) => {

          //------------------------------------------------------------------------------------------------
          const utctypedDate = new Date(result['DateTime']);

          // Convert to Sydney time (UTC+11)
          const sydneyTimeOffset = 11 * 60; // Sydney is UTC+11, so 11 hours in minutes
          utctypedDate.setMinutes(utctypedDate.getMinutes() + sydneyTimeOffset);
          
          // Format to 'YYYY-MM-DD HH:MM:SS'
          const theformattedSydneyDate = utctypedDate.toISOString().slice(0, 19).replace('T', ' ');
          chartDate.push(theformattedSydneyDate.split(' ')[0]);  // the date until 
          //-------------------------------------------------------------------------------------------------- get the current dates

          if(result['Hydrolight_1_-_Average_Speed_in_service'])
          {
            chartAveragespeed.push(parseFloat(result['Hydrolight_1_-_Average_Speed_in_service']).toFixed(2));
          }
          else
          {
            chartAveragespeed.push(0);
          }
          //-----------------------------------------------------------------  get the average speed
          
          if(result['Hydrolight_1_-_SOC_used'])
          {
            chartSocUsed.push(parseFloat(result['Hydrolight_1_-_SOC_used']).toFixed(2));
          }
          else
          {
            chartSocUsed.push(0);
          }
          //------------------------------------------------------------------------------ get the chartSocUsed
          
          
          if(result['Hydrolight_1_-_Energy_used'])
          {
            chartEnegeryUsed.push(parseFloat(result['Hydrolight_1_-_Energy_used']).toFixed(2));
          }
          else
          {
            chartEnegeryUsed.push(0);
          }

          //--------------------------------------------------------------------get _Distance_driven
          if(result['Hydrolight_1_-_Distance_driven'])
          {
            chartDistanceDriven.push(parseFloat(result['Hydrolight_1_-_Distance_driven']).toFixed(2));
          }
          else
          {
            chartDistanceDriven.push(0);
          }

          //--------------------------------------------------------------------get _Regeneration_rate
          if(result['Hydrolight_1_-_Regeneration_rate'])
          {
            chartRegenerationRate.push(parseFloat(result['Hydrolight_1_-_Regeneration_rate']).toFixed(2));
          }
          else
          {
            chartRegenerationRate.push(0);
          }


          //--------------------------------------------------------------------get energty used
          if(result['Hydrolight_1_-_Energy_driven'])
          {
            TotalEnergyDriven += parseFloat(result['Hydrolight_1_-_Energy_driven']);
          }
          if(index == results.length - 1 )
          {

            neededData.push(TotalEnergyDriven.toFixed(2));
          }

        
      });


      chartDate = chartDate.reverse();
      chartAveragespeed=  chartAveragespeed.reverse();
      chartSocUsed  = chartSocUsed.reverse();
      chartEnegeryUsed = chartEnegeryUsed.reverse();
      chartDistanceDriven= chartDistanceDriven.reverse();
      chartRegenerationRate = chartRegenerationRate.reverse();

      res.render('BusTrackInterface', { neededData: neededData,  chartRegenerationRate:chartRegenerationRate,chartDistanceDriven:chartDistanceDriven,chartDate:chartDate,chartAveragespeed:chartAveragespeed,chartSocUsed:chartSocUsed,chartEnegeryUsed:chartEnegeryUsed});
    });

  });
});


  module.exports = router;