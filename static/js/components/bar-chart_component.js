Chat.BarChartComponent = Ember.Component.extend({
  tagName: 'svg',
  attributeBindings: ['width', 'height'],
  margin: {top: 20, right: 20, bottom: 30, left: 40},

  w: function() {
    return this.get('width') - this.get('margin.left') - this.get('margin.right');
  }.property('width'),

  h: function() {
    return this.get('height') - this.get('margin.top') - this.get('margin.bottom');
  }.property('height'),

  transformG: function() {
    return 'translate(' + this.get('margin.left') + ',' + this.get('margin.top') + ')';
  }.property(),

  transformX: function() {
    return 'translate(0,' + this.get('h') + ')';
  }.property('h'),

  draw: function() {
    var width = this.get('w'),
        height = this.get('h'),
        data = this.get('data'),
        svg = d3.select('#' + this.get('elementId'));

    console.log('width height'.w());

    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], 0.1)
        .domain(data.map(function(d) { return d.key; }));

    var y = d3.scale.linear()
        .range([height, 0])
        .domain([0, d3.max(data, function(d) { return d.value; })]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient('bottom');

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient('left')
        .ticks(5);

    svg.select('.axis.x').call(xAxis);
    svg.select('.axis.y').call(yAxis);

    var rects = svg.select('.rects').selectAll('rect')
        .data(data);

    rects.exit().remove();

    rects.enter().append('rect');

    rects
        .attr('class', 'bar')
        .attr('x', function(d) { return x(d.key); })
        .attr('y', function(d) { return y(d.value); })
        .attr('width', x.rangeBand())
        .attr('height', function(d) { return height - y(d.value); })
  }.observes('data'),
  didInsertElement: function() {
    this.draw();
  }
})