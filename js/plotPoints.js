var plotPointLine = function (id, data, limits, basis, lineValue, lineLabel, errorLabel, initVal) {
    'use strict';

    var margin = {top: 20, right: 20, bottom: 30, left: 40},
        height = 400,
        width = 700;

    var svg = d3.select(id).append("svg")
        .style('width', width + margin.left + margin.right + 'px')
        .style('height', height + margin.top + margin.bottom + 'px');

    var xValue = function (d) {return d.x;},
        xScale = d3.scale.linear().range([0, width]).domain(limits.xlims),
        xMap = function (d) {return xScale(xValue(d));},
        xAxis = d3.svg.axis().scale(xScale).orient('bottom');

    var yValue = function (d) {return d.y;},
        yScale = d3.scale.linear().range([height, 0]).domain(limits.ylims),
        yMap = function (d) {return yScale(yValue(d));},
        yAxis = d3.svg.axis().scale(yScale).orient('right');

    var xvalues = d3.range(limits.xlims[0], limits.xlims[1], (limits.xlims[1] - limits.xlims[0]) / 100.0);
    var lineData = xvalues.map(function(j){return {"x": j, "y": initVal * basis(j)}});

    svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis)
        .append('text')
        .attr('class', 'label')
        .attr('x', width - 5)
        .attr('y', -2);

    svg.append('g')
        .attr('class', 'y axis')
        .attr('transform', 'translate(' + width + ', 0)')
        .call(yAxis)
        .append('text')
        .attr('class', 'label')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '-1.2em');

    svg.attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    svg.selectAll('g.y.axis')
        .call(yAxis);

    svg.selectAll('g.x.axis')
        .call(xAxis);

    var line = d3.svg.line().x(xMap).y(yMap);
    var points = svg.selectAll('.dot').data(data);
    var path = svg.append('g')
        .append('path')
        .attr('class', 'line')
        .style('stroke', 'red')
        .datum(lineData)
        .attr("d", line);

    points.enter()
        .append('circle')
        .attr('class', 'dot')
        .attr('opacity', 0.8)
        .style('fill', 'steelblue')
        .attr('r', 5)
        .attr('cx', xMap)
        .attr('cy', yMap);

    d3.select(lineValue).on("input", function(){
        update(+this.value);
    });

    function update(val){
        var error = d3.sum(data, function(j){return Math.pow(val * basis(j["x"]) - j["y"], 2)}) / data.length;
        d3.select(lineLabel).text(val.toFixed(2));
        d3.select(errorLabel).text(error.toFixed(1));
        lineData = xvalues.map(function(j){return {"x": j, "y": val * basis(j)}});
        path.datum(lineData).attr('class', 'line').attr("d", line).transition();
    }
    update(initVal);
};

var plotPoints = function (id, data, limits) {
    'use strict';

    var margin = {top: 20, right: 20, bottom: 30, left: 40},
        height = 500,
        width = 700;

    var svg = d3.select(id).append("svg")
        .style('width', width + margin.left + margin.right + 'px')
        .style('height', height + margin.top + margin.bottom + 'px');

    var xValue = function (d) {return d.x;},
        xScale = d3.scale.linear().range([0, width]).domain(limits.xlims),
        xMap = function (d) {return xScale(xValue(d));},
        xAxis = d3.svg.axis().scale(xScale).orient('bottom');

    var yValue = function (d) {return d.y;},
        yScale = d3.scale.linear().range([height, 0]).domain(limits.ylims),
        yMap = function (d) {return yScale(yValue(d));},
        yAxis = d3.svg.axis().scale(yScale).orient('right');

    svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis)
        .append('text')
        .attr('class', 'label')
        .attr('x', width - 5)
        .attr('y', -2);

    svg.append('g')
        .attr('class', 'y axis')
        .attr('transform', 'translate(' + width + ', 0)')
        .call(yAxis)
        .append('text')
        .attr('class', 'label')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '-1.2em');

    svg.attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    svg.selectAll('g.y.axis')
        .call(yAxis);

    svg.selectAll('g.x.axis')
        .call(xAxis);

    var points = svg.selectAll('.dot').data(data);

    points.enter()
        .append('circle')
        .attr('class', 'dot')
        .attr('opacity', 0.8)
        .style('fill', 'steelblue')
        .attr('r', 5)
        .attr('cx', xMap)
        .attr('cy', yMap);
};
