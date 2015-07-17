# Activity heatmap calendar

Implements an activity heatmap, which shows activity levels on a
calendar. An example is shown below:


![Example activity heatmap](activitymap.png)


## Usage

Example usage in `index.html`. The code segment that initialises the
activity heatmap is as follows:

            d3.csv("dji.csv", function(data) {
                var activityMap = new ActivityMap(data, {
                    "id": "dji-volume-map",
                    "parent": "#activitymap-container",
                    "title": "Dow Jones Index - Trading Volume ",
                    "timeColumn": "Timestamp",
                    "valueColumn": "Volume"
            });
            activityMap.render();


The API call takes the form:

            var activityMap = new ActivityMap(data, config);

Where `config` can have the following attributes:

* `id`: DOM identifier to use for the activity map.
* `parent`: The container DOM node. You can either specify a D3 node,
  or a CSS selector.
* `title`: Title to use at the top of the activity heatmap. The year
  range that is visible will be displayed as a suffix.
* `timeColumn`: In the input CSV data file, which column should we use
  to get the activity timestamp.
* `valueColumn`: In the input CSV data file, which column should we
  use to get the value to be used as heatmap value.
* `colours`: Array of colours that should be used to represent
  activity intensity. This is calculated according to the heatmap
  value relative to the maximum heatmap value in the data set. These
  colours should be specified as a gradient starting with the colour
  for the lowest value, and ending with the colour for the highest value.

If the config is unspecified, the following values will be taken by
default:

* `id`: 'example-activity-map'
* `parent`: 'body'
* `colours`:

             [ '#ffffff', '#ecffeb', '#daffd6', '#c7ffc2', '#b4ffad',
               '#a2ff99', '#8fff85', '#7cff70', '#69ff5c', '#57ff47',
               '#44ff33', '#31ff1f', '#1fff0a', '#14f500', '#13e000',
               '#11cc00', '#0ead00', '#0ea300', '#0c8f00', '#0a7a00',
               '#096600', '#075200', '#053d00', '#032900', '#021400' ];

* `title`: 'Activity map: '
* `timeColumn`: 't'
* `valueColumn`: 'v'

## Note

The Dow Jones Index, trading volume data was taken from this 
[d3js example](http://bl.ocks.org/mbostock/4063318).
