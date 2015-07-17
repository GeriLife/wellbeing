/* Copyright 2014 Gagarine Yaikhom (The MIT License) */
(function() {
    ActivityMap = function(data, config) {
        /* Contains an array of data points in the following format:
           [
           {
           "t": 1393009249000, // timestamp
           "v": 3,             // value
           } ...
           ]
        */
        this.data = data;
        this.id = 'example-activity-map';
        this.parent = 'body';
        this.colours = [ '#ffffff', '#ecffeb', '#daffd6', '#c7ffc2',
                         '#b4ffad', '#a2ff99', '#8fff85', '#7cff70', '#69ff5c',
                         '#57ff47', '#44ff33', '#31ff1f', '#1fff0a', '#14f500',
                         '#13e000', '#11cc00', '#0ead00', '#0ea300', '#0c8f00',
                         '#0a7a00', '#096600', '#075200', '#053d00', '#032900',
                         '#021400' ];
        this.title = 'Activity map: ';
        this.timeColumn = 't';
        this.valueColumn = 'v';

        if (config) {
            if (config.id)
                this.id = config.id;
            if (config.parent)
                this.parent = config.parent;
            if (config.colours)
                this.colours = config.colours;
            if (config.title)
                this.title = config.title;
            if (config.timeColumn)
                this.timeColumn = config.timeColumn;
            if (config.valueColumn)
                this.valueColumn = config.valueColumn;
        }
        this.init();
    };

    ActivityMap.prototype = {
        init: function() {
            var me = this, parent;
            me.process();
            if (typeof me.parent === 'string')
                parent = d3.select(me.parent);
            me.node = parent.append('div')
                .attr('id', me.id)
                .attr('class', 'activity-map');
            me.parent = parent;
            me.months = {
                '0': {
                    'n': 31,
                    'l': 'January'
                },
                '1': {
                    'n': 28,
                    'l': 'February'
                },
                '2': {
                    'n': 31,
                    'l': 'March'
                },
                '3': {
                    'n': 30,
                    'l': 'April'
                },
                '4': {
                    'n': 31,
                    'l': 'May'
                },
                '5': {
                    'n': 30,
                    'l': 'June'
                },
                '6': {
                    'n': 31,
                    'l': 'July'
                },
                '7': {
                    'n': 31,
                    'l': 'August'
                },
                '8': {
                    'n': 30,
                    'l': 'September'
                },
                '9': {
                    'n': 31,
                    'l': 'October'
                },
                '10': {
                    'n': 30,
                    'l': 'November'
                },
                '11': {
                    'n': 31,
                    'l': 'December'
                }
            };
            me.weeks = 'SMTWTFS';
        },
        reorderColours: function() {
            var me = this, c = me.colours, t, i = 0, j = c.length - 1;
            while (i < j) {
                t = c[i];
                c[i++] = c[j];
                c[j--] = t;
            }
        },
        process: function() {
            var me = this, data = me.data, record, ltab = { },
                y, m, d, i, c, t, v, years = [ ], temp = { },
                minY = 99999, maxY = 0, maxV = 0, tc = me.timeColumn, vc =
                me.valueColumn;
            
            /* Create a three-dimensional lookup table from the array
               of activity data points */
            for (i = 0, c = data.length; i < c; ++i) {
                record = data[i];
                if (record) {
                    t = new Date(parseInt(record[tc]));
                    y = t.getFullYear();
                    m = t.getMonth();
                    d = t.getDate() - 1;
                    v = parseFloat(record[vc]);

                    if (ltab[y] === undefined)
                        ltab[y] = { };
                    if (ltab[y][m] === undefined)
                        ltab[y][m] = { };
                    if (ltab[y][m][d] === undefined)
                        ltab[y][m][d] = v;

                    /* Get minimum and maximum years that defines the
                       activity data range */
                    if (minY > y)
                        minY = y;
                    if (maxY < y)
                        maxY = y;

                    if (maxV < v)
                        maxV = v;

                    /* Make an array of the years in range */
                    if (temp[y] === undefined) {
                        temp[y] = y;
                        years.push(y);
                    }
                }
            }

            me.processed = {
                'm': minY,
                'M': maxY,
                'V': maxV,
                'y': years,
                'l': ltab
            };
        },
        renderMonth: function(node, y, m, d) {
            var me = this, i, j, n, w, v, month = me.months[m],
                ltab = me.processed.l, colours = me.colours,
                idx = colours.length / me.processed.V;

            n = node.append('div')
                .attr('class', 'amap-month');
            n.append('div')
                .attr('class', 'amap-month-name')
                .text(month.l);

            /* Fill this with empty cells, so that the valid days are
               aligned correctly to the week-days */
            for (i = 0; i < d; ++i)
                n.append('div')
                .attr('class', 'amap-empty-day');

            /* Now add cells for the valid days */
            for (j = 0, d = month.n; j < d; ++i, ++j) {
                w = n.append('div')
                    .attr('class', 'amap-week-day');

                if (i % 7 === 0)
                    w.classed('amap-week-start', true);

                /* We set here the correct colour code using our
                   lookup table of values supplied by the user */
                try {
                    v = ltab[y][m][j];
                    if (v) {
                        w.style('background-color',
                                colours[Math.ceil(v * idx)]);
                        w.attr('title', y + '-' + (m + 1)
                               + '-' + (j + 1) + ': ' + v);
                    }
                } catch (e) {
                }
            }

            /* weekday for next month */
            d = i % 7;

            /* Fill remaining invalid days with empty cells */
            while (i++ % 7)
                n.append('div')
                .attr('class', 'amap-empty-day');

            /* Fill in week-day initials */
            n = n.append('div')
                .attr('class', 'amap-week-names');
            for (i = 0; i < 7; ++i)
                n.append('div')
                .attr('class', 'amap-week-name')
                .text(me.weeks[i]);

            return d;
        },
        renderYear: function(y) {
            var me = this, d, i, n;

            /* Account for leap-year */
            me.months[1].n = y % 4 ? 28 : 29;

            n = me.blocks.append('div')
                .attr('class', 'amap-year-block')
                .attr('year', y);
            n.append('div')
                .attr('class', 'amap-year-name')
                .text(y);
            n = n.append('div')
                .attr('class', 'amap-months');

            /* Find at what week day the first month of year begins */
            d = new Date(y, 0, 1);
            d = d.getDay();
            for (i = 0; i < 12; ++i)
                d = me.renderMonth(n, y, i, d);
        },
        isVisible: function(block, parent) {
            var yearDim = block.getBoundingClientRect(),
                parentDim = parent.getBoundingClientRect();
            return !(yearDim.top > parentDim.bottom ||
                     yearDim.bottom < parentDim.top);
        },
        onScroll: function(me) {
            var minYear = 99999, maxYear = 0, year;
            me.blocks.selectAll('.amap-year-block')
                .each(function() {
                    if (me.isVisible(this, me.blocks.node())) {
                        year = parseInt(d3.select(this).attr('year'));
                        if (minYear > year)
                            minYear = year;
                        if (maxYear < year)
                            maxYear = year;
                    }
                });
            if (minYear === maxYear)
                me.year.text(me.title + maxYear);
            else
                me.year.text(me.title + minYear + '-' + maxYear);
        },
        render: function() {
            var me = this, i, c, years = me.processed.y;
            me.year = me.node.append('div')
                .attr('class', 'amap-title');
            me.blocks = me.node.append('div')
                .attr('class', 'amap-year-blocks');
            me.blocks.on('scroll', function() {
                me.onScroll(me);
            });
            me.refit();
            for (i = 0, c = years.length; i < c; ++i)
                me.renderYear(years[i]);
            me.onScroll(me);
        },
        refit: function() {
            var me = this;
            me.blocks.style('height',
                            (parseInt(me.node.style('height'))
                             - parseInt(me.year.style('height'))) + 'px');
        }
    };
})();
