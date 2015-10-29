var margin = {t:50,r:125,b:50,l:125};
var width = document.getElementById('plot').clientWidth - margin.r - margin.l,
    height = document.getElementById('plot').clientHeight - margin.t - margin.b;

var canvas = d3.select('.plot')
    .append('svg')
    .attr('width',width+margin.r+margin.l)
    .attr('height',height + margin.t + margin.b)
    .append('g')
    .attr('class','canvas')
    .attr('transform','translate('+margin.l+','+margin.t+')');

//Scale for the size of the circles
var scaleR = d3.scale.sqrt().domain([0,100]).range([5,120]);


d3.csv('data/olympic_medal_count.csv', parse, dataLoaded);

function dataLoaded(err,rows){

    //TODO: fill out this function
    d3.selectAll('.btn-group .year')
        .on('click', function() {

            var year = d3.select(this).attr('id');

            if (year == 'year-1900') {

                var y1900 = 1900;
                rows.sort(function(a,b){
                    return b[y1900] - a[y1900];
                });
                var top5 = rows.slice(0,5);
                draw(top5, y1900);
            }
            else if (year == 'year-1960') {

                var y1960 =  1960;
                rows.sort(function(a,b){
                    return b[y1960] - a [y1960];
                });
                var top5 = rows.slice(0,5);
                draw(top5, y1960);
            }
            else {

                var y2012 = 2012;
                rows.sort(function(a,b){
                    return b[y2012] - a[y2012];
                });
                var top5 = rows.slice(0,5);
                draw(top5, y2012);
            }
            console.log(top5);
        }
    )

}




function draw(rows, year){
    //TODO: Complete drawing function, accounting for enter, exit, update
    //Note that this function requires two parameters
    //The second parameter, "year", determines which one of the three years (1900,1960,2012) to draw the medal counts based on
    var node = canvas.selectAll('.node')
                    .data(rows, function(d){return d.country});
    var    nodeenter = node.enter()
            .append("g")
            .attr('class','node')
            nodeenter
                .append('circle')
                .attr('r',0)
                .style('fill','rgb(255, 153, 51)')
                .style('stroke','rgb(153, 204, 0)')
                .style('stroke-width',4);
            nodeenter
                .append('text')
                .text(function(d){
                    return d.country
                });
    node.exit()
        .remove();

    node.transition()
        .duration(700)
        .delay(function(d, i) { return i *700; })
        .select('circle')
        .attr('transform',function(d,i){return 'translate('+i*220+','+height/6+')';})
        .attr('cy',60)
        //.attr('cx',function(d,i){
        //    return i*220;
        //})
        .attr('r',function(d){
            return scaleR(d[year])/2;
        });
    node.transition()
        .duration(1000).select('text')
        .delay(function(d, i) { return i *700; })
        .attr('transform',function(d,i){return 'translate('+i*220+','+height/9+')';})
        //node.append('text')
        //    .text(function (d){
        //    return d.country;
        //})

}

function parse(row){
    //@param row is each unparsed row from the dataset
    return {
        country: row['Country'],
        1900: +row['1900'],
        1960: +row['1960'],
        2012: +row['2012']
    };
}